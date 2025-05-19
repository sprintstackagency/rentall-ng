
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { UserRole } from "@/types";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("renter");
  const [passwordError, setPasswordError] = useState("");
  
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    
    if (!name || !email || !password || !confirmPassword) {
      return;
    }
    
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    try {
      await signup(email, password, name, role);
      // Redirect based on role
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          placeholder="John Doe" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="your@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input 
          id="confirmPassword" 
          type="password" 
          placeholder="••••••••" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {passwordError && <p className="text-destructive text-xs mt-1">{passwordError}</p>}
      </div>
      
      <div className="space-y-3">
        <Label>I want to</Label>
        <RadioGroup 
          value={role} 
          onValueChange={(value: UserRole) => setRole(value)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="renter" id="renter" />
            <Label htmlFor="renter" className="cursor-pointer">Rent equipment for my events</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="vendor" id="vendor" />
            <Label htmlFor="vendor" className="cursor-pointer">Rent out my equipment to others</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button type="submit" className="w-full bg-brand hover:bg-brand-dark" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> Creating account
          </>
        ) : (
          "Create account"
        )}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground">
        By creating an account, you agree to our{" "}
        <a href="#" className="text-brand hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-brand hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

export default SignupForm;
