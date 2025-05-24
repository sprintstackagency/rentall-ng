
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

  // Fetch user profile with comprehensive error handling
  const fetchUserProfile = useCallback(async (userId: string): Promise<User | null> => {
    try {
      console.log("🔍 Fetching profile for user:", userId);
      
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("❌ Profile fetch error:", error);
        throw new Error(`Failed to fetch profile: ${error.message}`);
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

      console.log("✅ Profile fetched successfully:", userData.name);
      return userData;
    } catch (error: any) {
      console.error("❌ Failed to fetch user profile:", error.message);
      throw error;
    }
  }, []);

  // Create user profile if it doesn't exist
  const createUserProfile = useCallback(async (authUser: any): Promise<User> => {
    try {
      console.log("🔨 Creating profile for user:", authUser.id);
      
      const email = authUser.email || "";
      const name = authUser.user_metadata?.name || email.split('@')[0];
      const role: UserRole = (authUser.user_metadata?.role as UserRole) || "renter";

      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: authUser.id,
          email: email,
          name: name,
          role: role,
        })
        .select()
        .single();

      if (insertError) {
        console.error("❌ Profile creation error:", insertError);
        throw new Error(`Failed to create profile: ${insertError.message}`);
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

      console.log("✅ Profile created successfully:", userData.name);
      return userData;
    } catch (error: any) {
      console.error("❌ Failed to create user profile:", error.message);
      throw error;
    }
  }, []);

  // Clear authentication state
  const clearAuthState = useCallback(() => {
    console.log("🧹 Clearing auth state");
    setUser(null);
    setSession(null);
    setIsAuthenticated(false);
  }, []);

  // Handle session changes with robust error handling
  const handleSession = useCallback(async (newSession: Session | null) => {
    console.log("🔄 Handling session:", !!newSession);
    
    if (!newSession?.user) {
      clearAuthState();
      setIsLoading(false);
      return;
    }

    try {
      setSession(newSession);
      
      // Try to fetch existing profile first
      let profile: User | null = null;
      
      try {
        profile = await fetchUserProfile(newSession.user.id);
      } catch (error) {
        console.log("📝 Profile not found, creating new one...");
        // If profile doesn't exist, create it
        profile = await createUserProfile(newSession.user);
      }

      if (profile) {
        setUser(profile);
        setIsAuthenticated(true);
        console.log("✅ Session handled successfully for:", profile.name);
      } else {
        throw new Error("Failed to load or create user profile");
      }
    } catch (error: any) {
      console.error("❌ Session handling error:", error.message);
      
      // Force logout on profile errors
      await supabase.auth.signOut();
      clearAuthState();
      
      toast({
        title: "Profile Error",
        description: "There was an issue loading your profile. Please try logging in again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserProfile, createUserProfile, clearAuthState, toast]);

  // Initialize authentication
  useEffect(() => {
    console.log("🚀 Initializing authentication...");
    let mounted = true;

    const initAuth = async () => {
      try {
        // Set up the auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (!mounted) return;
            
            console.log("🔔 Auth state change:", event);
            
            if (event === 'SIGNED_OUT') {
              clearAuthState();
              setIsLoading(false);
            } else {
              await handleSession(session);
            }
          }
        );

        // Get the current session
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Error getting session:", error);
          clearAuthState();
        } else if (mounted) {
          await handleSession(currentSession);
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error: any) {
        console.error("❌ Auth initialization error:", error.message);
        if (mounted) {
          clearAuthState();
          setIsLoading(false);
        }
      }
    };

    const cleanup = initAuth();
    
    return () => {
      mounted = false;
      cleanup.then(fn => fn?.());
    };
  }, [handleSession, clearAuthState]);

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    if (!session?.user?.id) return;
    
    try {
      const profile = await fetchUserProfile(session.user.id);
      if (profile) {
        setUser(profile);
        console.log("✅ Profile refreshed successfully");
      }
    } catch (error: any) {
      console.error("❌ Profile refresh error:", error.message);
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh profile data.",
        variant: "destructive",
      });
    }
  }, [session?.user?.id, fetchUserProfile, toast]);

  // Login function with improved error handling
  const login = async (email: string, password: string) => {
    console.log("🔑 Attempting login for:", email);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      if (!data?.session?.user) {
        throw new Error("No user session returned");
      }

      console.log("✅ Login successful");
      
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });

      // Navigate based on user role after state settles
      setTimeout(() => {
        const currentUser = data.session.user;
        const userRole = currentUser.user_metadata?.role || "renter";
        
        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "vendor") {
          navigate("/vendor");
        } else {
          navigate("/dashboard");
        }
      }, 100);
      
    } catch (error: any) {
      console.error("❌ Login error:", error);
      
      let errorMessage = "Please check your credentials and try again.";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message?.includes("Email not confirmed")) {
        errorMessage = "Please check your email and click the confirmation link.";
      } else if (error.message?.includes("Too many requests")) {
        errorMessage = "Too many login attempts. Please wait a moment and try again.";
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

  // Signup function with improved error handling
  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    console.log("📝 Attempting signup for:", email);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
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

      console.log("✅ Signup successful");
      
      toast({
        title: "Account Created!",
        description: `Welcome to RentAll.ng, ${name}!`,
      });

      // Navigate based on role after state settles
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "vendor") {
          navigate("/vendor");
        } else {
          navigate("/dashboard");
        }
      }, 100);
      
    } catch (error: any) {
      console.error("❌ Signup error:", error);
      
      let errorMessage = "Please check your information and try again.";
      
      if (error.message?.includes("User already registered")) {
        errorMessage = "An account with this email already exists. Please try logging in instead.";
      } else if (error.message?.includes("Password should be at least")) {
        errorMessage = "Password should be at least 6 characters long.";
      } else if (error.message?.includes("Invalid email")) {
        errorMessage = "Please enter a valid email address.";
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
    console.log("👋 Logging out user");
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      clearAuthState();
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("❌ Logout error:", error);
      
      // Force clear state even if logout fails
      clearAuthState();
      
      toast({
        title: "Logout Failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
      
      navigate("/");
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
