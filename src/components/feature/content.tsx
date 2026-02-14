"use client";
import { motion } from "framer-motion";
import {
  FileText,
  Brain,
  Zap,
  Lock,
  Globe,
  MessageSquare,
  Search,
  Download,
} from "lucide-react";
import AnimatedSection from "../about/Animated_section";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced AI understands context, extracts key insights, and provides accurate answers from your documents.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description:
      "Chat naturally with your PDFs. Ask questions in plain language and get human-like responses.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find exactly what you need instantly. Our AI searches through pages in milliseconds.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get answers in seconds, not minutes. Our optimized infrastructure ensures rapid responses.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "Bank-level encryption protects your documents. Your data never leaves our secure servers.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Upload documents in any language. Our AI understands and responds in 50+ languages.",
  },
  {
    icon: Download,
    title: "Export & Share",
    description:
      "Export conversations, summaries, and insights. Share with your team effortlessly.",
  },
  {
    icon: FileText,
    title: "Bulk Processing",
    description:
      "Upload multiple PDFs at once. Chat across all your documents simultaneously.",
  },
];

const FeatureContent = () => {
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
            Powerful Features for
            <br />
            <span className="bg-gradient-to-r from-[#0e8df2] to-[#0e8df2]/700 bg-clip-text text-transparent">
              Smarter Documents
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to unlock insights from your PDFs with
            cutting-edge AI technology.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <AnimatedSection>
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-[#0e8df2]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#0e8df2]" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
};

export default FeatureContent;
