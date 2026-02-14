import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import PrivacyContent from "@/components/privacy_page/cotent";
import { getUserSession } from "@/lib/auth/session";

const PrivacyPolicy = async () => {
  const session = await getUserSession();
  return (
    <main className="min-h-screen bg-background">
      <Navbar session={session} />
      <PrivacyContent />
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
