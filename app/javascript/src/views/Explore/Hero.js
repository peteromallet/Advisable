import React, { useMemo } from "react";
import { motion } from "framer-motion";
import one from "./assets/specialist01.jpg";
import two from "./assets/specialist02.jpg";
import three from "./assets/specialist03.jpg";
import four from "./assets/specialist04.jpg";
import random from "src/utilities/random";

function AnimatedLine({ offset, direction = "down" }) {
  const transition = useMemo(() => {
    return {
      delay: random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      duration: random([4, 5, 6, 7]),
      ease: "linear",
      repeat: Infinity,
      repeatDelay: random([4, 5, 6, 7, 8, 9, 10]),
    };
  }, []);

  return (
    <motion.div
      data-direction={direction}
      className="grid-line-highlight"
      initial={{
        opacity: 0.32,
        y: direction == "up" ? "var(--grid-area)" : 0,
      }}
      animate={{
        x: direction == "down" ? "var(--grid-area)" : 0,
        y: direction == "up" ? -100 : 0,
        opacity: 0.3,
      }}
      transition={transition}
      style={{ "--offset": offset }}
    />
  );
}

function HeroSquare({ delay, src, ...props }) {
  return (
    <motion.div
      {...props}
      animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1, spring: { stiffness: 300 } }}
      className="hero-square"
    >
      <div className="hero-square-content">
        <img src={src} />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <div className="hero mb-4">
      <div className="relative py-40 max-w-[1300px] mx-auto px-5 lg:px-10">
        <div className="hero-mask">
          <div className="hero-grid">
            <div>
              <AnimatedLine offset={20} />
              <AnimatedLine offset={12} />
              <AnimatedLine offset={8} />
              <AnimatedLine offset={2} />
              <AnimatedLine offset={-4} />
              <AnimatedLine offset={-12} />
              <AnimatedLine offset={-18} />
              <AnimatedLine direction="up" offset={0} />
              <AnimatedLine direction="up" offset={6} />
              <AnimatedLine direction="up" offset={12} />
              <AnimatedLine direction="up" offset={20} />
              <AnimatedLine direction="up" offset={-6} />
              <AnimatedLine direction="up" offset={-12} />
              <AnimatedLine direction="up" offset={-20} />
            </div>
            <div>
              <HeroSquare src={one} initial={{ x: 0, opacity: 0 }} />
              <HeroSquare
                src={two}
                initial={{ y: 0, opacity: 0 }}
                delay={0.2}
              />
              <HeroSquare
                src={three}
                initial={{ x: 0, opacity: 0 }}
                delay={0.4}
              />
              <HeroSquare
                src={four}
                initial={{ y: 0, opacity: 0 }}
                delay={0.6}
              />
            </div>
          </div>
        </div>
        <div className="z-10 relative max-w-[720px]">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.8 }}
            className="font-serif text-6xl text-white font-bold tracking-[-0.02em] mb-6"
          >
            Explore the world's best marketing projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05, duration: 1 }}
            className="max-w-[600px] text-white text-xl leading-relaxed"
          >
            Marketers showcase their best projects on Advisable - the home to
            the world's best marketing and growth professionals.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
