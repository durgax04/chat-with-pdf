"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, LayoutDashboard } from "lucide-react";

import { GoogleLoginButton } from "./GoogleLoginButton";
import { NavbarProps } from "@/types/landingpage";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const Navbar = ({ session }: { session: NavbarProps }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navItems = [
    { label: "Features", href: isHomePage ? "#features" : "/features" },
    {
      label: "How it Works",
      href: isHomePage ? "#how-it-works" : "/#how-it-works",
    },
    { label: "Pricing", href: isHomePage ? "#pricing" : "/pricing" },
  ];
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#0da2e7] from-primary via-primary to-primary/80 rounded-lg flex items-center justify-center shadow-soft">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              ChatWith
              <span className="text-[#0da2e7] from-primary via-primary to-primary/80">
                PDF
              </span>
            </span>
          </Link>

          {/* EXTRA LOGO SECTION (From provided code) */}
          {/* <Link href="/" className="hidden md:flex items-center">
            <div className="p-2">
              <Image src={Logo} alt="Logo" className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              ChatWithPDF
            </span>
          </Link> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Login / CTA */}
          <div className="flex items-center gap-4">
            {session ? (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <GoogleLoginButton />
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
