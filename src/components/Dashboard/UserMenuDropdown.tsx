"use client";

import { useState } from "react";
import { Loader2, LogOut, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";

export const UserMenuDropdown = ({ userImage }: { userImage?: string }) => {
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Sign out failed:", error);
      setSigningOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <UserAvatar userImage={userImage} />
          <ChevronDown className="w-4 h-4 hidden sm:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-40 rounded-xl border bg-popover p-1 shadow-lg"
      >
        <DropdownMenuItem
          className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer text-destructive focus:text-destructive"
          onClick={handleSignOut}
          disabled={signingOut}
        >
          {signingOut ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing out...</span>
            </>
          ) : (
            <>
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};