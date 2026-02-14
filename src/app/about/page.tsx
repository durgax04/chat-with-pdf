import AboutContent from "@/components/about/content";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import { getUserSession } from "@/lib/auth/session";

const About = async () => {
  const session = await getUserSession();
  return (
    <main className="min-h-screen bg-background">
      <Navbar session={session} />
      <AboutContent />
      <Footer />
    </main>
  );
};

export default About;
