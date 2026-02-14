"use client";

import {
  Loader2,
  LogOut,
  LayoutDashboard,
  CreditCard,
  ChevronDown,
  FileText,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";

export const DashboardHeader = ({ userImage }: { userImage?: string }) => {
  const [signingOut, setSigningOut] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  // Close sign-out dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSignOutOpen(false);
      }
    }
    if (signOutOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [signOutOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#0da2e7] from-primary via-primary to-primary/80 rounded-lg flex items-center justify-center shadow-soft">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              ChatWith
              <span className="text-[#0da2e7] from-[#0da2e7] via-[#0da2e7] to-[#0da2e7]/80">
                PDF
              </span>
            </span>
          </Link>

          {/* Navigation + User Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex hover:bg-[#0da2e7] hover:text-white"
              asChild
            >
              <Link href="/pricing">
                <CreditCard className="w-4 h-4 mr-2" />
                Pricing
              </Link>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                    {userImage ? (
                      <Image
                        src={userImage}
                        alt="User profile"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-white">
                        t
                      </span>
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-40 rounded-xl border bg-popover p-1 shadow-lg"
              >
                <DropdownMenuItem
                  className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer"
                  onClick={async () => {
                    setSigningOut(true);
                    await signOut({ callbackUrl: "/" });
                    setSigningOut(false);
                  }}
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

            {/* Optional small sign-out dropdown using existing logic */}
            {signOutOpen && (
              <div ref={dropdownRef} className="relative">
                <div className="absolute right-0 mt-2 w-40 bg-gray-900 shadow-lg rounded-lg z-50">
                  <Button
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="w-full px-4 py-2 text-left text-white hover:bg-red-600 rounded transition-all flex items-center gap-2"
                  >
                    {signingOut ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Signing out...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
