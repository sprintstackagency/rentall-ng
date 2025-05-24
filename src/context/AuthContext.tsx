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
    console.log("AuthProvider initializing...");
    let authStateSubscription: { unsubscribe: () => void } | null = null;

    // Set up auth state change listener
    const setupAuthListener = () => {
      console.log("Setting up auth state listener");
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log("Auth state changed:", event, !!session);
          console.log("Session:", session);
          console.log("User:", session?.user);
          
          if (session?.user) {
            console.log("Session found, fetching user profile");
            try {
              await fetchUserProfile(session.user.id);
            } catch (error) {
              console.error("Failed to fetch user profile:", error);
              // If profile fetching fails, sign out the user
              await handleProfileFetchFailure();
            }
          } else {
            console.log("No session, clearing user state");
            setUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);
          }
        }
      );
      
      authStateSubscription = data.subscription;
    };

    // Check for existing session
    const checkExistingSession = async () => {
      try {
        console.log("Checking for existing session");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log("Existing session found");
          await fetchUserProfile(session.user.id);
        } else {
          console.log("No existing session");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoading(false);
      }
    };

    setupAuthListener();
    checkExistingSession();

    return () => {
      console.log("Cleaning up auth subscription");
      if (authStateSubscription) {
        authStateSubscription.unsubscribe();
      }
    };
  }, []);

  // Handle profile fetch failure by logging out the user
  const handleProfileFetchFailure = async () => {
    console.log("Profile fetch failed, logging out user");
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      toast({
        title: "Session Error",
        description: "There was an issue with your session. Please log in again.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user profile with proper error handling and timeout
  const fetchUserProfile = async (userId: string) => {
    console.log("Fetching user profile for ID:", userId);
    
    // Set a timeout to prevent infinite loading
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Profile fetch timeout")), 10000)
    );
    
    try {
      console.log("Starting profile fetch from database...");
      const profilePromise = supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      console.log("Awaiting profile response...");
      const response = await Promise.race([profilePromise, timeoutPromise]);
      console.log("Raw profile response:", response);

      const { data: profile, error } = response as any;

      if (error) {
        console.error("Profile fetch error details:", {
          code: error.code,
          message: error.message,
          details: error.details
        });
        
        if (error.code === 'PGRST116') {
          console.log("No profile found, creating one...");
          return await createUserProfile(userId);
        }
        throw error;
      }

      if (profile) {
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

        setUser(userData);
        setIsAuthenticated(true);
        console.log("User profile loaded:", userData);
      }
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
      
      // If it's a timeout or any other error (not missing profile), throw to trigger logout
      if (error.message !== "Profile fetch timeout" && error.code !== 'PGRST116') {
        throw error;
      }
      
      // For timeout errors, throw to trigger logout
      if (error.message === "Profile fetch timeout") {
        throw new Error("Profile fetch timed out");
      }
      
      // Only try to create profile if it doesn't exist (PGRST116)
      if (error.code === 'PGRST116') {
        console.log("Attempting to create profile due to missing profile");
        await createUserProfile(userId);
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Create a user profile with better error handling
  const createUserProfile = async (userId: string) => {
    console.log("Creating new user profile for ID:", userId);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        throw new Error("Authentication user not found");
      }
      
      const email = authUser.email || "";
      const name = authUser.user_metadata?.name || email.split('@')[0];
      const role: UserRole = (authUser.user_metadata?.role as UserRole) || "renter";
      
      const { data: newProfile, error } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          email: email,
          name: name,
          role: role,
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      if (newProfile) {
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

        setUser(userData);
        setIsAuthenticated(true);
        console.log("New user profile created:", userData);
        
        toast({
          title: "Welcome!",
          description: "Your profile has been created successfully.",
        });
        
        return userData;
      }
    } catch (error: any) {
      console.error("Error creating user profile:", error.message);
      throw error; // Throw to trigger logout in fetchUserProfile
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log("Login attempt for:", email);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error || !data?.session?.user) {
        throw error ?? new Error("No user session returned");
      }
  
      // The onAuthStateChange will handle profile fetching
      console.log("Login successful, waiting for profile load...");
      
      // Wait for auth state to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to RentAll.ng!",
      });
  
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
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
  
      const userId = data.user?.id;
      if (userId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: userId,
              email,
              name,
              role,
            }
          ]);
  
        if (profileError) {
          console.warn("Profile creation during signup failed:", profileError);
          // Don't throw here, let the auth flow handle it
        }
      }
  
      toast({
        title: "Signup Successful",
        description: `Welcome to RentAll.ng, ${name}!`,
      });
  
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
    console.log("Logging out user");
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
      console.error("Logout error:", error);
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
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
