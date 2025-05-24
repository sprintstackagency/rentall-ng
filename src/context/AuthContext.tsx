
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, UserRole } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { Session, AuthError } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Profile fetching with comprehensive error handling
  const fetchUserProfile = useCallback(async (userId: string): Promise<User | null> => {
    try {
      console.log("Fetching profile for user:", userId);
      
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Profile fetch error:", error);
        
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log("Profile not found, creating new profile...");
          return await createUserProfile(userId);
        }
        
        throw error;
      }

      if (!profile) {
        throw new Error("Profile data is null");
      }

      const userData: User = {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as UserRole,
        phone: profile.phone || undefined,
        address: profile.address || undefined,
        createdAt: profile.created_at,
        avatar: profile.avatar || undefined,
      };

      console.log("Profile fetched successfully:", userData.name);
      return userData;
    } catch (error: any) {
      console.error("Failed to fetch user profile:", error.message);
      throw error;
    }
  }, []);

  // Create user profile if it doesn't exist
  const createUserProfile = useCallback(async (userId: string): Promise<User> => {
    try {
      console.log("Creating profile for user:", userId);
      
      // Get the current auth user for metadata
      const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !authUser) {
        throw new Error("Could not get authenticated user data");
      }

      const email = authUser.email || "";
      const name = authUser.user_metadata?.name || email.split('@')[0];
      const role: UserRole = (authUser.user_metadata?.role as UserRole) || "renter";

      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          email: email,
          name: name,
          role: role,
        })
        .select()
        .single();

      if (insertError) {
        console.error("Profile creation error:", insertError);
        throw insertError;
      }

      const userData: User = {
        id: newProfile.id,
        email: newProfile.email,
        name: newProfile.name,
        role: newProfile.role as UserRole,
        phone: newProfile.phone || undefined,
        address: newProfile.address || undefined,
        createdAt: newProfile.created_at,
        avatar: newProfile.avatar || undefined,
      };

      console.log("Profile created successfully:", userData.name);
      
      toast({
        title: "Welcome!",
        description: "Your profile has been created successfully.",
      });

      return userData;
    } catch (error: any) {
      console.error("Failed to create user profile:", error.message);
      throw error;
    }
  }, [toast]);

  // Handle auth state changes
  const handleAuthStateChange = useCallback(async (event: string, newSession: Session | null) => {
    console.log("Auth state changed:", event, !!newSession);
    
    try {
      setSession(newSession);
      
      if (newSession?.user) {
        console.log("Session found, fetching profile...");
        const profile = await fetchUserProfile(newSession.user.id);
        
        if (profile) {
          setUser(profile);
          setIsAuthenticated(true);
          console.log("Auth state updated successfully");
        } else {
          throw new Error("Failed to load user profile");
        }
      } else {
        console.log("No session, clearing user state");
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error: any) {
      console.error("Auth state change error:", error.message);
      
      // On any profile-related error, clear session and logout
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Session Error",
        description: "There was an issue with your session. Please log in again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserProfile, toast]);

  // Initialize auth on mount
  useEffect(() => {
    console.log("Initializing auth system...");
    
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        // Set up auth state listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (mounted) {
              handleAuthStateChange(event, session);
            }
          }
        );

        // Get current session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          await handleAuthStateChange('INITIAL_SESSION', currentSession);
        }

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (error: any) {
        console.error("Auth initialization error:", error.message);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    const cleanup = initializeAuth();
    
    return () => {
      mounted = false;
      cleanup.then(fn => fn?.());
    };
  }, [handleAuthStateChange]);

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      const profile = await fetchUserProfile(session.user.id);
      if (profile) {
        setUser(profile);
      }
    } catch (error: any) {
      console.error("Profile refresh error:", error.message);
    }
  }, [session?.user?.id, fetchUserProfile]);

  // Login function
  const login = async (email: string, password: string) => {
    console.log("Login attempt for:", email);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data?.session?.user) {
        throw new Error("No user session returned");
      }

      // Success! The onAuthStateChange will handle the rest
      console.log("Login successful");
      
      toast({
        title: "Login Successful",
        description: "Welcome back to RentAll.ng!",
      });

      // Navigate after a brief delay to allow state to settle
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Please check your credentials and try again";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message?.includes("Email not confirmed")) {
        errorMessage = "Please check your email and click the confirmation link.";
      }
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    console.log("Signup attempt for:", email);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (!data?.user) {
        throw new Error("No user data returned");
      }

      console.log("Signup successful");
      
      toast({
        title: "Signup Successful",
        description: `Welcome to RentAll.ng, ${name}!`,
      });

      // Navigate after a brief delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
      
    } catch (error: any) {
      console.error("Signup error:", error);
      
      let errorMessage = "Please check your information and try again";
      
      if (error.message?.includes("User already registered")) {
        errorMessage = "An account with this email already exists. Please try logging in instead.";
      } else if (error.message?.includes("Password should be at least")) {
        errorMessage = "Password should be at least 6 characters long.";
      }
      
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    console.log("Logging out user");
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      // Clear state immediately
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Logout error:", error);
      
      // Force clear state even if logout fails
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logout Failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
