import { Upload, MessageCircle, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload a PDF",
    description: "Simply drag and drop your PDF document or click to browse.",
  },
  {
    icon: MessageCircle,
    title: "Chat with your PDF",
    description: "Ask questions about your document in natural language.",
  },
  {
    icon: Sparkles,
    title: "Get instant answers",
    description: "Receive accurate, AI-powered responses in seconds.",
  },
];

const Steps = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start chatting with your PDFs in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-background rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Connector Line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-accent -translate-y-1/2 z-10"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Steps;
