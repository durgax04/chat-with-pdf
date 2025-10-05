"use client";

import { Loader2, LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Logo from "@/assets/logo.png";

export const DashboardHeader = ({ userImage }: { userImage?: string }) => {
  const [signingOut, setSigningOut] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="w-full py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-900 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <div className="p-2">
            <Image src={Logo} alt="Logo" className="w-8 h-8" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
            ChatWithPDF
          </span>
        </Link>
        <div className="flex items-center gap-3"></div>
        {/* Right: User Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Button
            className="p-3 rounded-full bg-[#0e0f11] focus:outline-none flex items-center gap-2"
            onClick={() => setDropdownOpen((v) => !v)}
          >
            {userImage ? (
              <Image
                src={userImage}
                alt="User profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <User className="h-8 w-8" />
            )}
          </Button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-900 shadow-lg rounded-lg z-50 animate-fade-in">
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
          )}
        </div>
      </div>
    </header>
  );
};
