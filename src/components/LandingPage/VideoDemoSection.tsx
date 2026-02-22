"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const VideoDemoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (e) {
      console.warn("Play failed", e);
    }
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      await playVideo();
    } else {
      pauseVideo();
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
          >
            {/* Placeholder Video - Replace src with actual video URL */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
            >
              <source
                src="https://res.cloudinary.com/db2vutcez/video/upload/Screencast_from_2026-02-23_00-00-56_rzqwum.mp4"
                type="video/mp4"
              />
            </video>
            {/* Play/Pause Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-background/30 transition-opacity duration-300 ${
                isPlaying ? "opacity-0 " : "opacity-100"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-gradient-primary rounded-full flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                ) : (
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" />
                )}
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoDemoSection;
