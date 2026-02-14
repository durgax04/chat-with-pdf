"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Research Scholar",
    avatar: "PS",
    rating: 5,
    text: "This tool has transformed how I review research papers. I can now analyze 50+ page documents in minutes instead of hours. Absolutely game-changing for my PhD work!",
  },
  {
    name: "Rahul Mehta",
    role: "Legal Consultant",
    avatar: "RM",
    rating: 5,
    text: "Reviewing contracts used to take forever. Now I upload the document and get instant answers to specific clauses. It's like having a research assistant available 24/7.",
  },
  {
    name: "Ananya Patel",
    role: "Business Analyst",
    avatar: "AP",
    rating: 5,
    text: "I use this daily for analyzing financial reports. The accuracy is impressive, and it saves me hours every week. The best investment I've made for my productivity.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by Hundreds
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our users are saying about Chat with PDF
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-muted/30 border border-border/50 rounded-2xl p-6 sm:p-8 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-[#0da2e7] font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
