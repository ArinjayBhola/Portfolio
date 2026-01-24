"use client";

import { motion } from "framer-motion";

const HeroBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-secondary/40 rounded-full blur-[100px]"
      />
    </div>
  );
};

export default HeroBackground;
