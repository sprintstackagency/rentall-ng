
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localLoading, setLocalLoading] = useState(false);
  const { login, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password) {
      return;
    }

    setLocalLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error("Login form error:", error);
    } finally {
      setLocalLoading(false);
    }
  };

  const isFormLoading = localLoading || isLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
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
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <button 
            type="button"
            className="text-xs text-brand hover:underline"
            onClick={() => console.log("Forgot password clicked")}
          >
            Forgot password?
          </button>
        </div>
        <Input 
          id="password" 
          name="password"
          type="password" 
          placeholder="••••••••" 
          value={formData.password}
          onChange={handleInputChange}
          disabled={isFormLoading}
          required
          autoComplete="current-password"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-brand hover:bg-brand-dark" 
        disabled={isFormLoading || !formData.email.trim() || !formData.password}
      >
        {isFormLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> 
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}

export default LoginForm;
