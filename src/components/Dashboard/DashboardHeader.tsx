"use client";

import Link from "next/link";
import { CreditCard, FileText } from "lucide-react";

import { Button } from "../ui/button";
import { UserMenuDropdown } from "./UserMenuDropdown";

export const DashboardHeader = ({ userImage }: { userImage?: string }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#0da2e7] rounded-lg flex items-center justify-center shadow-soft">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              ChatWith
              <span className="text-[#0da2e7]">PDF</span>
            </span>
          </Link>

          {/* Navigation Controls & Profile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex hover:bg-[#0da2e7] hover:text-white transition-colors"
              asChild
            >
              <Link href="/pricing">
                <CreditCard className="w-4 h-4 mr-2" />
                Pricing
              </Link>
            </Button>

            <UserMenuDropdown userImage={userImage} />
          </div>
        </div>
      </div>
    </nav>
  );
};