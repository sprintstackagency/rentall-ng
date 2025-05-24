
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Loader } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    setLocalLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login error:", error);
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
          type="email" 
          placeholder="your@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isFormLoading}
          required
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="#" className="text-xs text-brand hover:underline">
            Forgot password?
          </a>
        </div>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isFormLoading}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-brand hover:bg-brand-dark" 
        disabled={isFormLoading}
      >
        {isFormLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> 
            {localLoading ? "Signing in..." : "Loading..."}
          </>
        ) : (
          "Log in"
        )}
      </Button>
    </form>
  );
}

export default LoginForm;
