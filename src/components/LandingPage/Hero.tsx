"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const Hero = () => {
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

            <Button
              variant="google"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg transition bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-medium"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>

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
                  src="https://res.cloudinary.com/db2vutcez/video/upload/v1/Screencast_from_2025-10-03_22-18-36_yzcbwf.webm"
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
