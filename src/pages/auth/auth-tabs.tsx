
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";

interface AuthTabsProps {
  defaultTab?: "login" | "signup";
}

export function AuthTabs({ defaultTab = "login" }: AuthTabsProps) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full max-w-md mx-auto">
      <Card className="animate-fade-in">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="space-y-4">
          <TabsContent value="login" className="mt-0">
            <div className="space-y-2">
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </div>
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="signup" className="mt-0">
            <div className="space-y-2">
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your details to create your account
              </CardDescription>
            </div>
            <SignupForm />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}

export default AuthTabs;
