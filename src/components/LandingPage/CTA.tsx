"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section id="cta" className="py-16 md:py-24 bg-gradient-to-r">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-5xl mx-auto rounded-[32px] bg-gradient-to-r from-[#33c6ff] to-[#0e8df2] p-10 md:p-16 text-center overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 opacity-25">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#5fd5ff] rounded-full" />
            <div className="absolute -bottom-16 -right-4 w-64 h-64 bg-[#2aa8ff] rounded-full" />
          </div>

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4"
            >
              Ready to chat with your PDFs?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-white/90 mb-10 max-w-2xl mx-auto"
            >
              Join hundreds of users who save hours every week. Start your 7-day
              free trial today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-white text-[#0e8df2] hover:bg-white/90 font-medium shadow-md w-full sm:w-auto"
                asChild
              >
                <Link href="/pricing">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 bg-white/20 text-white border-white/40 hover:bg-white/15 w-full sm:w-auto"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
