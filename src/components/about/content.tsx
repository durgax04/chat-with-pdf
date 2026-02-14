"use client";
import { motion } from "framer-motion";
import AnimatedSection from "./Animated_section";
import { Heart, Target, Users } from "lucide-react";

const AboutContent = () => {
  return (
    <>
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
          >
            About
            <span className="bg-gradient-to-r from-[#0e8df2] to-[#0e8df2]/70 bg-clip-text text-transparent">
              {" "}
              ChatPDF
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We're on a mission to make document intelligence accessible to
            everyone.
          </motion.p>
        </div>
      </section>
      <AnimatedSection>
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  desc: "To revolutionize how people interact with documents using AI, making information extraction effortless and instant.",
                },
                {
                  icon: Heart,
                  title: "Our Values",
                  desc: "Privacy, security, and user trust are at the core of everything we build. Your documents are always protected.",
                },
                {
                  icon: Users,
                  title: "Our Team",
                  desc: "A passionate team of AI researchers, engineers, and designers dedicated to building the best PDF chat experience.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-card border border-border rounded-2xl p-8"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-[#0e8df2]" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
      <AnimatedSection>
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2025, ChatWithPDF was born from a simple frustration:
              why is it so hard to quickly find information in long documents?
              Our founders, experienced AI researchers, set out to create a tool
              that would make document interaction as natural as having a
              conversation. Today, we help thousands of users worldwide save
              time and unlock insights from their documents.
            </p>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
};

export default AboutContent;
