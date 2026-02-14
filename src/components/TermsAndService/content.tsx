"use client";
import { motion } from "framer-motion";

const TermsAndServiceContent = () => {
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
            Terms of Service
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
            className="space-y-8"
          >
            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing or using ChatWithPDF, you acknowledge and accept
                these Terms of Service. If you are not comfortable with any part
                of these terms, we kindly ask that you refrain from using our
                service, and we truly appreciate your understanding.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Use of Service
              </h2>
              <p className="text-muted-foreground mb-4">
                You agree to use the service only for lawful purposes. You may
                not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Upload illegal or harmful content</li>
                <li>Attempt to breach our security measures</li>
                <li>
                  Use the service to infringe on intellectual property rights
                </li>
                <li>Resell or redistribute our service without permission</li>
              </ul>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Subscription & Payments
              </h2>
              <p className="text-muted-foreground">
                Paid subscriptions are billed monthly. You are welcome to cancel
                at any time, and your subscription will remain active until the
                end of the current billing period. If you would like to request
                a cancellation and refund, please kindly contact us at{" "}
                <span className="font-medium">support@example.com</span> within
                1 hour of your purchase. We would be grateful if you could
                briefly share the reason for your cancellation so we can
                continue improving our service. Our team will review your
                request and get back to you as soon as possible.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Limitation of Liability
              </h2>
              <p className="text-muted-foreground">
                ChatWithPDF is provided "as is" without warranties of any kind.
                We are not liable for any damages arising from your use of the
                service.
              </p>
            </section>

            <section className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Contact
              </h2>
              <p className="text-muted-foreground">
                For questions about these Terms, please contact us at
                legal@chatpdf.com.
              </p>
            </section>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TermsAndServiceContent;
