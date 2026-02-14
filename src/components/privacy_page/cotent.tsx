"use client";
import { motion } from "framer-motion";

const PrivacyContent = () => {
  return (
    <>
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-center mb-12"
          >
            Last updated: December 15, 2025
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-neutral dark:prose-invert max-w-none space-y-8"
          >
            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, such as when
                you create an account, upload documents, or contact us for
                support.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Account information (email, name)</li>
                <li>Documents you upload for processing</li>
                <li>Chat history and interactions</li>
                <li>Payment information (processed securely by Razorpay)</li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and
                improve our services, process transactions, send you technical
                notices and support messages, and respond to your comments and
                questions.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Data Security
              </h2>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your
                data. We do not share your documents with third parties.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Contact Us
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please
                contact us at privacy@chatpdf.com.
              </p>
            </section>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PrivacyContent;
