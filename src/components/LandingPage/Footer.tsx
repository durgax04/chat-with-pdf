import Image from "next/image";
import Logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Logo and Copyright */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="">
                <Image src={Logo} alt="Logo" className="w-8 h-8"/>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                ChatWithPDF
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} ChatWithPDF. All rights reserved.
            </p>
          </div>

          {/* Right - Links */}
          <div className="flex flex-wrap gap-6 md:justify-end">
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
