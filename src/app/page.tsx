import CTASection from "@/components/LandingPage/CTA";
import FAQ from "@/components/LandingPage/FAQ";
import FeaturesSection from "@/components/LandingPage/Features";
import Footer from "@/components/LandingPage/Footer";
import HeroSection from "@/components/LandingPage/Hero";
import Navbar from "@/components/LandingPage/Navbar";
import PricingSection from "@/components/LandingPage/Pricing";
import Steps from "@/components/LandingPage/Steps";
import TestimonialsSection from "@/components/LandingPage/Testimonial";
import VideoDemoSection from "@/components/LandingPage/VideoDemoSection";
import { getUserSession } from "@/lib/auth/session";

export default async function Home() {
  const session = await getUserSession();

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar session={session} />
        <HeroSection />
        <VideoDemoSection />
        <PricingSection />
        <FeaturesSection />
        <Steps />
        <TestimonialsSection />
        <FAQ />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}

// return (
//     <div className="flex h-screen justify-center items-center">
//       <h1>Welcone to my Chat app.</h1>
//       <Link
//         href="/api/auth/signin"
//         className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-md"
//       >
//         Sign in with Google
//       </Link>
//     </div>
//   );
