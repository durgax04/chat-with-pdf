import { getUserSession } from "@/lib/auth/session";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import ContactForm from "@/components/LandingPage/ContactForm";

export default async function ContactPage() {
  const session = await getUserSession();

  return (
    <div className="min-h-screen bg-background">
      <Navbar session={session} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
