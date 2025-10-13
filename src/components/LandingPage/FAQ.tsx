import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What file formats are supported?",
      answer: "Currently, we support PDF files. Simply upload your PDF document and start asking questions instantly.",
    },
    {
      question: "How does the chat feature work?",
      answer: "Our AI analyzes your PDF content and allows you to ask questions in natural language. You'll get accurate answers based on the document's content within seconds.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. All uploaded documents are encrypted and stored securely. We never share your documents with third parties.",
    },
    {
      question: "What's the maximum file size?",
      answer: "If this site is not in vercel, you can upload PDF files up to 14MB in size. But this site is running on vercel, It supports less that 1MB size pdf, For larger documents, please contact our support team.",
    },
    {
      question: "Can I ask questions in any language?",
      answer: "Yes, our AI supports multiple languages. You can ask questions in your preferred language and receive answers accordingly.",
    },
    {
      question: "How many documents can I upload?",
      answer: "Now It is completely free no limit, But we will eventually add this - The number of documents depends on your plan. Free users can upload up to 3 documents, while premium users enjoy unlimited uploads.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Find answers to common questions about ChatWithPDF
          </p>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
