import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import PricingContent from "@/components/pricing/content";
import { getUserSession } from "@/lib/auth/session";

const Pricing = async () => {
  const session = await getUserSession();
  return (
    <main className="min-h-screen bg-background">
      <Navbar session={session} />
      <PricingContent />
      <Footer />
    </main>
  );
};

export default Pricing;
