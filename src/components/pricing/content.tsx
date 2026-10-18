"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Pro",
    price: "$7",
    description: "For individuals & regular users",
    features: [
      "Unlimited PDFs per month",
      "Up to 5-400 pages per PDF",
      "Fast AI responses",
      "Priority email support",
      "Export conversations",
      "7-day free trial",
    ],
    popular: true,
    beta: false,
  },
  {
    name: "Business",
    price: "$14",
    description: "For teams & power users",
    features: [
      "200 PDFs per month",
      "Up to 200 pages per PDF",
      "Priority AI speed",
      "Priority support",
      "API access",
      "Team collaboration",
      "7-day free trial",
    ],
    popular: false,
    beta: true,
  },
];

const PricingContent = () => {
  return (
    <>
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Simple, Transparent
              <br />
              <span className="bg-linear-to-r from-[#0e8df2] to-[#0e8df2]/700 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className={`relative bg-card border rounded-2xl p-8 ${
                  plan.popular
                    ? "border-[#0e8df2] shadow-lg shadow-primary/10"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0e8df2] text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                {plan.beta && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0e8df2] text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Beta
                  </div>
                )}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingContent;
