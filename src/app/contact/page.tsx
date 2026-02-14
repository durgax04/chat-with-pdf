import ContectContent from "@/components/contact/content";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import { getUserSession } from "@/lib/auth/session";

const Contact = async () => {
  const session = await getUserSession();
  return (
    <main className="min-h-screen bg-background">
      <Navbar session={session} />
      <ContectContent />
      <Footer />
    </main>
  );
};

export default Contact;
