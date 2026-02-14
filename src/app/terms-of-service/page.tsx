import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import TermsAndServiceContent from "@/components/TermsAndService/content";
import { getUserSession } from "@/lib/auth/session";

const TermsOfService = async () => {
  const session = await getUserSession();
  return (
    <main className="min-h-screen bg-background">
      <Navbar session={session} />
      <TermsAndServiceContent />
      <Footer />
    </main>
  );
};

export default TermsOfService;
