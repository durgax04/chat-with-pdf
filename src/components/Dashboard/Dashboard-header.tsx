"use client";

import { Loader2, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { signOut } from "next-auth/react";

interface DashboardHeaderProps {
  username: string;
}

export const DashboardHeader = ({ username }: DashboardHeaderProps) => {
  const [signingOut, setSigningOut] = useState<boolean>(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Welcome, <span className="text-primary">{username}</span>
        </h1>
        <Button
          onClick={handleSignOut}
          disabled={signingOut}
          variant="destructive"
          size="sm"
          className="gap-2 hover:glow-destructive transition-all duration-300"
        >
          {signingOut && <Loader2 className="h-5 w-5 animate-spin" />}
          {signingOut ? (
            "Signing out..."
          ) : (
            <div className="flex items-center gap-2">
              <p>Logout</p>
              <LogOut className="h-5 w-5" />
            </div>
          )}
        </Button>
      </div>
    </header>
  );
};

