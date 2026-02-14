"use client";
import { motion } from "framer-motion";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    price: "7",
    period: "month",
    popular: true,
    features: [
      "Up to 5-400 pages per PDF",
      "Unlimited PDFs per month",
      "Fast AI responses",
      "Email support",
    ],
  },
];

const PricingCard = ({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.03, y: -5 }}
    className={`relative bg-card rounded-2xl p-6 md:p-8 border transition-shadow duration-300 ${
      plan.popular
        ? "border-[#0da2e7] shadow-glow"
        : "border-border shadow-card hover:shadow-float"
    }`}
  >
    {/* {plan.popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <span className="bg-[#0da2e7] text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
          Popular
        </span>
      </div>
    )} */}

    <div className="flex items-center gap-2 mb-6">
      <CreditCard className="w-5 h-5 text-[#0da2e7]" />
      <div className="flex items-baseline gap-1">
        <span className="text-4xl md:text-5xl font-bold text-foreground">
          ${plan.price}
        </span>
        <span className="text-muted-foreground">/ {plan.period}</span>
      </div>
    </div>

    <ul className="space-y-4 mb-8">
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="w-5 h-5 bg-[#0da2e7]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check className="w-3 h-3 text-[#0da2e7]" />
          </div>
          <span className="text-foreground text-sm md:text-base">
            {feature}
          </span>
        </li>
      ))}
    </ul>

    <Button
      className={`w-full ${
        plan.popular
          ? "bg-[#0da2e7] shadow-soft"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
      size="lg"
    >
      Subscribe Now
    </Button>
  </motion.div>
);

const PricingSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f7f7f7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple pricing for everyone
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-10 md:mt-12"
        >
          {/* <div className="flex items-center gap-2 text-muted-foreground">
            <Check className="w-5 h-5 text-[#0da2e7]" />
            <span>Cancel anytime</span>
          </div> */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Check className="w-5 h-5 text-[#0da2e7]" />
            <span>No hidden fees</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
