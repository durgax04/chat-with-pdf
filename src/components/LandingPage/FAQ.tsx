"use client";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Chat with PDF work?",
    answer:
      "Simply upload your PDF document, and our AI will analyze its content. You can then ask questions in natural language, and get instant, accurate answers based on the document's content.",
  },
  {
    question: "What types of PDFs can I upload?",
    answer:
      "You can upload any text-based PDF including research papers, contracts, reports, manuals, books, and more. Scanned documents with OCR text are also supported.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. Your documents are encrypted with bank-level 256-bit SSL encryption. We never share your data with third parties, and you can delete your documents anytime. Your privacy is our top priority.",
  },
  {
    question: "How accurate are the AI responses?",
    answer:
      "Our AI uses advanced language models to provide highly accurate responses based strictly on your document's content. It cites specific sections so you can verify the information.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes! You can cancel your subscription at any time with no questions asked. There are no hidden fees or cancellation charges. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and PayPal through our secure Stripe payment gateway. All transactions are processed securely.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 7-day free trial on all plans so you can experience the full power of Chat with PDF before committing. No credit card required to start.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-[#f7f7f7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Chat with PDF
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border/50 rounded-xl px-6 overflow-hidden transition-all duration-300 hover:border-[#0da2e7] hover:shadow-lg hover:shadow-primary/5"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-medium hover:no-underline hover:text-[#0da2e7] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
