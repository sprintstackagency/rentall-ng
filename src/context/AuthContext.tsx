
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  // Mock authentication for now - will be replaced with Supabase later
  useEffect(() => {
    const storedUser = localStorage.getItem("rental_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - will be replaced with Supabase
      if (email && password) {
        // Mock user based on email
        const mockUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          role: email.includes("admin") ? "admin" : email.includes("vendor") ? "vendor" : "renter",
          name: email.split("@")[0],
          createdAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem("rental_user", JSON.stringify(mockUser));
        toast({
          title: "Login Successful",
          description: `Welcome back, ${mockUser.name}!`,
        });
      } else {
        throw new Error("Invalid credentials");
      }
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
      // Mock signup - will be replaced with Supabase
      if (email && password && name) {
        const mockUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          email,
          role,
          name,
          createdAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem("rental_user", JSON.stringify(mockUser));
        toast({
          title: "Signup Successful",
          description: `Welcome to RentGear, ${name}!`,
        });
      } else {
        throw new Error("Please fill all required fields");
      }
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "Please check your information and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("rental_user");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
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
