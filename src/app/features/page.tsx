import FeatureContent from "@/components/feature/content";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import { getUserSession } from "@/lib/auth/session";

const Features = async () => {
  const session = await getUserSession();
  return (
    <main className="min-h-screen bg-background">
      <Navbar session={session} />
      <FeatureContent />
      <Footer />
    </main>
  );
};

export default Features;
