"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function GoogleLoginButton() {

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      
      await signIn("google", { callbackUrl: "/dashboard" });
      
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="google"
      onClick={handleLogin}
      disabled={isLoading}
      className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:shadow-lg transition bg-[#0da2e7] text-white font-medium hover:bg-[#0a75a7]"
    >{isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Signing in...
        </>
      ) : (
        <>
          <span>Sign in</span>
        </>
      )}</Button>
  );
}
