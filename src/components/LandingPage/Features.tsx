"use client";
import { motion } from "framer-motion";
import {
  FileSearch,
  MessageSquare,
  Zap,
  Shield,
  Globe,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Smart Document Analysis",
    description:
      "Our AI understands context, tables, charts, and complex document structures.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description:
      "Ask questions in plain language and get accurate, detailed answers instantly.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get responses in seconds, not minutes. Process documents up to 500 pages.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your documents are encrypted and never stored. Complete privacy guaranteed.",
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description:
      "Chat with documents in 50+ languages with accurate translation.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Access your documents and chat anytime, anywhere, on any device.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful features for
            <br />
            <span className="text-gradient">every document</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand, analyze, and extract insights
            from your PDFs.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-card hover:shadow-float transition-shadow"
            >
              <div className="w-12 h-12 bg-[#0da2e7] from-primary via-primary to-primary/80 rounded-xl flex items-center justify-center mb-5 shadow-soft">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
