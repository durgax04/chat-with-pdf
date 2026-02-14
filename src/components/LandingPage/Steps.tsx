"use client";
import { motion } from "framer-motion";
import { Upload, Search, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your PDF",
    description:
      "Simply drag and drop your PDF document or click to browse. We support files up to 500 pages.",
  },
  {
    icon: Search,
    step: "02",
    title: "AI Analyzes Content",
    description:
      "Our advanced AI reads and understands your document in seconds, ready for your questions.",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Start Chatting",
    description:
      "Ask questions naturally and get accurate answers with citations from your document.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
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
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in three simple steps. No signup required for your first
            document.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector Line - Desktop Only */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-[2px] bg-[#0da2e7] from-primary/50 to-primary/10" />
              )}

              {/* Step Number */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative z-10 w-20 h-20 mx-auto mb-6 bg-[#0da2e7] rounded-2xl flex items-center justify-center shadow-float"
              >
                <step.icon className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              {/* Step Label */}
              <span className="text-sm font-semibold text-primary mb-2 block">
                Step {step.step}
              </span>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
