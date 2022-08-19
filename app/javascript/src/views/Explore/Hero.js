import React from "react";
import { motion } from "framer-motion";
import one from "./assets/specialist01.jpg";
import two from "./assets/specialist02.jpg";
import three from "./assets/specialist03.jpg";
import four from "./assets/specialist04.jpg";
import GridLines from "src/components/GridLines";

function randomBetween(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function HeroSquare({ delay, src, ...props }) {
  return (
    <motion.div
      {...props}
      initial={{
        opacity: 0,
        scale: randomBetween(0.5, 0.7),
        rotateY: randomBetween(20, 40),
        rotateX: randomBetween(60, 80),
        transformPerspective: 500,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        transformPerspective: 500,
      }}
      transition={{
        delay,
        duration: 1,
        damping: 20,
        stiffness: 120,
        type: "spring",
      }}
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
    <div className="mb-4 hero">
      <div className="relative z-10 py-44 px-5 mx-auto lg:px-10 max-w-[1300px]">
        <GridLines color="#e4cfff" highlight="#BEA1FB">
          <div className="relative z-40 hero-squares">
            <HeroSquare src={one} />
            <HeroSquare src={two} delay={0.2} />
            <HeroSquare src={three} delay={0.4} />
            <HeroSquare src={four} delay={0.6} />
          </div>
        </GridLines>
        <div className="relative z-10 max-w-[700px]">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.8 }}
            className="mb-6 font-serif text-6xl font-bold text-blue900 tracking-[-0.02em]"
          >
            Discover the best of{" "}
            <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
              SaaS Marketing
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05, duration: 1 }}
            className="text-xl leading-relaxed text-blue900 max-w-[600px]"
          >
            Find out what's working for leading marketers and connect with them
            for mentorship & fractional support
          </motion.p>
        </div>
      </div>
    </div>
  );
}
