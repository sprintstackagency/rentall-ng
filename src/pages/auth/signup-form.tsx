
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import { UserRole } from "@/types";

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "renter" as UserRole,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localLoading, setLocalLoading] = useState(false);
  const { signup, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleRoleChange = (value: UserRole) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLocalLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name, formData.role);
    } catch (error) {
      console.error("Signup form error:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const isFormLoading = localLoading || isLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          name="name"
          placeholder="John Doe" 
          value={formData.name}
          onChange={handleInputChange}
          disabled={isFormLoading}
          required
          autoComplete="name"
        />
        {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          placeholder="your@email.com" 
          value={formData.email}
          onChange={handleInputChange}
          disabled={isFormLoading}
          required
          autoComplete="email"
        />
        {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          name="password"
          type="password" 
          placeholder="••••••••" 
          value={formData.password}
          onChange={handleInputChange}
          disabled={isFormLoading}
          required
          autoComplete="new-password"
        />
        {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input 
          id="confirmPassword" 
          name="confirmPassword"
          type="password" 
          placeholder="••••••••" 
          value={formData.confirmPassword}
          onChange={handleInputChange}
          disabled={isFormLoading}
          required
          autoComplete="new-password"
        />
        {errors.confirmPassword && <p className="text-destructive text-xs">{errors.confirmPassword}</p>}
      </div>
      
      <div className="space-y-3">
        <Label>I want to</Label>
        <RadioGroup 
          value={formData.role} 
          onValueChange={handleRoleChange}
          className="flex flex-col space-y-1"
          disabled={isFormLoading}
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
      
      <Button 
        type="submit" 
        className="w-full bg-brand hover:bg-brand-dark" 
        disabled={isFormLoading}
      >
        {isFormLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground">
        By creating an account, you agree to our{" "}
        <button 
          type="button"
          className="text-brand hover:underline"
          onClick={() => console.log("Terms clicked")}
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button 
          type="button"
          className="text-brand hover:underline"
          onClick={() => console.log("Privacy clicked")}
        >
          Privacy Policy
        </button>
        .
      </p>
    </form>
  );
}

export default SignupForm;
