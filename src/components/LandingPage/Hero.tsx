"use client";
import { motion } from "framer-motion";
import { Check, CreditCard, FileText, MessageCircle, Sparkles, Upload, Zap } from "lucide-react";

const FloatingCard = ({
  children,
  className,
  delay = 0,
  floatRange = 12,
  duration = 5,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  floatRange?: number;
  duration?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
    className={className}
  >
    <motion.div
      animate={{
        y: [0, -floatRange, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay * 0.5,
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const GlowOrb = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
    className={className}
  >
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl"
    />
  </motion.div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

        {/* Animated glow orbs */}
        <GlowOrb className="absolute top-20 left-1/4 w-96 h-96" delay={0.2} />
        <GlowOrb
          className="absolute bottom-40 right-1/4 w-80 h-80"
          delay={0.5}
        />
        <GlowOrb
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          delay={0.8}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Floating Elements - Hidden on very small screens */}
        <div className="hidden lg:block">
          {/* PDF Document Card - Left */}
          <FloatingCard
            className="absolute left-4 xl:left-12 2xl:left-24 top-16 xl:top-20"
            delay={0.3}
            floatRange={15}
            duration={6}
          >
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-border/50 max-w-[180px] hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500">
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FileText className="w-4 h-4 text-destructive" />
                </motion.div>
                <span className="text-xs font-medium text-foreground">
                  Report.pdf
                </span>
              </div>
              <div className="space-y-2">
                <motion.div
                  className="h-2 bg-muted rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <motion.div
                  className="h-2 bg-muted rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, delay: 1 }}
                />
                <motion.div
                  className="h-2 bg-muted rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </div>
            </div>
          </FloatingCard>

          {/* Chat Bubble - Right Top */}
          <FloatingCard
            className="absolute right-4 xl:right-12 2xl:right-24 top-12 xl:top-16"
            delay={0.5}
            floatRange={10}
            duration={5.5}
          >
            <div className="bg-card/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-border/50 max-w-[220px] hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500">
              <div className="flex items-start gap-3">
                <motion.div
                  className="w-9 h-9 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/25"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </motion.div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 font-medium">
                    AI Assistant
                  </p>
                  <motion.p
                    className="text-sm text-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    The report shows a 23% increase in Q3...
                  </motion.p>
                </div>
              </div>
            </div>
          </FloatingCard>

          {/* Upload Card - Left Bottom */}
          <FloatingCard
            className="absolute left-4 xl:left-16 2xl:left-28 bottom-16 xl:bottom-24"
            delay={0.7}
            floatRange={8}
            duration={4.5}
          >
            <div className="bg-card/80 backdrop-blur-xl rounded-xl p-3 shadow-2xl border border-border/50 hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Upload className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Upload PDF
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Drag & drop files
                  </p>
                </div>
              </div>
            </div>
          </FloatingCard>

          {/* Message Count Card - Right Bottom */}
          <FloatingCard
            className="absolute right-4 xl:right-16 2xl:right-28 bottom-20 xl:bottom-28"
            delay={0.9}
            floatRange={12}
            duration={5}
          >
            <div className="bg-card/80 backdrop-blur-xl rounded-xl p-3 shadow-2xl border border-border/50 hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <motion.p
                    className="text-2xl font-bold text-foreground"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.5, type: "spring" }}
                  >
                    1K+
                  </motion.p>
                  <p className="text-xs text-muted-foreground">Messages sent</p>
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon with glow effect */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
            className="relative inline-flex items-center justify-center mb-8"
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 bg-[#0da2e7]/20 rounded-2xl blur-xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-[#0da2e7] from-primary via-primary to-primary/80 rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center">
              <FileText className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
            </div>
          </motion.div>

          {/* Headline with stagger effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Chat with any PDF
            </motion.span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-[#0da2e7]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              instantly
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto px-4 leading-relaxed"
          >
            Upload your documents and get instant answers. Ask questions,
            summarize content, and extract insights powered by AI.
          </motion.p>

          {/* Trust Badge with icon */}
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground mt-8"
          >
            {[
              { text: "100% Secure Payment", icon: CreditCard },
              { text: "Instant Activation", icon: Check },
              { text: "Fast AI Responses", icon: Check },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "hsl(var(--card))",
                }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="w-4 h-4 text-[#0da2e7]" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
