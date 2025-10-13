import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import { getUserSession } from "@/lib/auth/session";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Terms = async () => {
  const session = await getUserSession();
  return (
    <div className="min-h-screen bg-background">
      <Navbar session={session} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <article className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-4">Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using ChatWithPDF, you agree to be bound by these
              Terms of Service and all applicable laws and regulations. If you
              do not agree with any of these terms, you are prohibited from
              using this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-4">Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily use ChatWithPDF for personal,
              non-commercial purposes. This license shall automatically
              terminate if you violate any of these restrictions.
            </p>
            <p className="text-muted-foreground">
              Under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Modify or copy the service materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>
                Attempt to reverse engineer any software contained in the
                service
              </li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person or server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-4">User Content</h2>
            <p className="text-muted-foreground">
              You retain all rights to the PDF documents and content you upload
              to ChatWithPDF. By uploading content, you grant us a license to
              process and analyze your documents solely for the purpose of
              providing our services to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-4">Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">
              You agree not to use ChatWithPDF to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Upload illegal, harmful, or offensive content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the intellectual property rights of others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-4">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              ChatWithPDF and its suppliers will not be liable for any damages
              arising out of the use or inability to use the service. This
              includes, but is not limited to, data loss, service interruptions,
              or accuracy of AI-generated responses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-4">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes via email or through the
              service. Continued use of the service after changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mt-4">Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please
              contact us through our{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact page
              </Link>
              .
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
