"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const VideoDemoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
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
            See how it works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Watch a quick demo of chatting with your PDF
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Discover how easy it is to extract insights, get instant answers,
            and have meaningful conversations with any document. Our AI
            understands context, remembers your questions, and delivers accurate
            responses in seconds.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div
            className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border shadow-float cursor-pointer group"
            onClick={handlePlayPause}
            onMouseEnter={handleMouseEnter}
          >
            {/* Placeholder Video - Replace src with actual video URL */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1920&h=1080&fit=crop"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-background/30 transition-opacity duration-300 ${
                isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                ) : (
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" />
                )}
              </motion.div>
            </div>

            {/* Floating UI Elements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border hidden md:flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-foreground font-medium">
                AI Processing
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border hidden md:block"
            >
              <span className="text-xs text-muted-foreground">
                Instant responses
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoDemoSection;
