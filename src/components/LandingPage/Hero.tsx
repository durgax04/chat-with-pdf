import Link from "next/link";
import { GoogleLoginButton, GoogleLoginButton2 } from "./GoogleLoginButton";
import { HeroProps } from "@/types/landingpage";


const Hero = ({ session }: { session: HeroProps }) => {

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Chat With Your{" "}
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
                  PDFs Instantly
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                Upload your documents and start asking questions in seconds. Get
                instant, accurate answers powered by AI.
              </p>
            </div>

            {/* CTA Button */}

          
            {session ? (
            <Link
              href="/dashboard"
              className="gap-2 border px-4 py-2 rounded-lg transition bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-medium"
            >
              Go to Dashboard
            </Link>
          ) : (
            <GoogleLoginButton2 />
          )}

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-sm text-muted-foreground">
                <div className="font-semibold text-foreground">100% Free</div>
                <div>No credit card required</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-sm text-muted-foreground">
                <div className="font-semibold text-foreground">Secure</div>
                <div>Your data is private</div>
              </div>
            </div>
          </div>

          {/* Right Content - Demo Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-video object-cover"
              >
                <source
                  src="https://res.cloudinary.com/db2vutcez/video/upload/v1/Screencast_from_2025-10-05_20-56-22_bdbkrd.webm"
                  type="video/webm"
                />
              </video>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 pointer-events-none"></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
