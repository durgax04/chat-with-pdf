import { getUserSession } from "@/lib/auth/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import GoogleLoginButton from "./GoogleLoginButton";
import Image from "next/image";
import Logo from "@/assets/logo.png";

const Navbar = async () => {
  const session = await getUserSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="p-2">
              <Image src={Logo} alt="Logo" className="w-8 h-8"/>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              ChatWithPDF
            </span>
          </Link>

          {/* Login Button */}
          <GoogleLoginButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
