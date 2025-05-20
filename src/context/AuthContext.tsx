
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, UserRole } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize auth and set up session listener
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        if (session && session.user) {
          // Get user profile with role information
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile with role from the profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }

      if (profile) {
        // Map Supabase profile to our User type
        const userData: User = {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          role: profile.role as UserRole,
          phone: profile.phone || undefined,
          address: profile.address || undefined,
          createdAt: profile.created_at,
        };

        setUser(userData);
        setIsAuthenticated(true);
        console.log("User profile loaded:", userData);
      }
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
      // If we can't get the profile, sign out for safety
      supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error || !data?.session?.user) {
        throw error ?? new Error("No user session returned");
      }
  
      await fetchUserProfile(data.session.user.id); // Ensure user state is set
  
      toast({
        title: "Login Successful",
        description: "Welcome back to RentAll.ng!",
      });
  
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Sign up with Supabase and include name and role in metadata
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
      console.log("Sign up result:", data);
  
      if (error) {
        throw error;
      }
  
      // Create the profile after successful signup
      const userId = data.user?.id; // Get the user ID from the signup response
      if (userId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: userId,  // Use the user ID as the profile ID
              email,
              name,
              role,
            }
          ]);
  
        if (profileError) {
          throw profileError; // Handle profile creation error
        }
      }
  
      toast({
        title: "Signup Successful",
        description: `Welcome to RentAll.ng, ${name}! Please check your email for verification.`,
      });
  
      // For development purposes, we'll navigate to dashboard
      // In production, the user would need to verify their email first
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: error.message || "Please check your information and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      navigate("/");
    } catch (error: any) {
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
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout
      }}
    >
            {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

