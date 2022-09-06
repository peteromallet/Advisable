import React from "react";
import { AnimatePresence, motion } from "framer-motion";

function HeroSquare({ color, delay, scale = 1, backgroundPosition }) {
  return (
    <div className="hero-square">
      <motion.div
        style={{ background: color }}
        className="hero-square-diamond"
        transition={{ delay }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div
          className="hero-square-content"
          style={{ backgroundPosition, "--scale": scale }}
        />
      </motion.div>
    </div>
  );
}

const LOGOS = [
  {
    id: "postman",
    delay: 0.1,
    scale: 0.9,
    color: "#fff",
    backgroundPosition: "0 0",
  },
  {
    id: "invision",
    delay: 0.3,
    scale: 1,
    color: "#FF3366",
    backgroundPosition: "-160px 0",
  },
  {
    id: "clio",
    delay: 0.05,
    scale: 1.1,
    color: "#fff",
    backgroundPosition: "0 -40px",
  },
  {
    id: "bicommerce",
    delay: 0.25,
    scale: 1.3,
    color: "#34323F",
    backgroundPosition: "-80px 0",
  },
  {
    id: "bizzabo",
    delay: 0.45,
    scale: 1,
    color: "#FFF",
    backgroundPosition: "-40px -40px",
  },
  {
    id: "intercom",
    delay: 0,
    scale: 0.8,
    color: "#FFF",
    backgroundPosition: "-80px -40px",
  },
  {
    id: "toggl",
    delay: 0.2,
    scale: 1.1,
    color: "#2B1337",
    backgroundPosition: "-40px 0",
  },
  {
    id: "gong",
    delay: 0.4,
    scale: 0.8,
    color: "#fff",
    backgroundPosition: "-120px -40px",
  },
  {
    id: "travelperk",
    delay: 0.15,
    scale: 1.1,
    color: "#013098",
    backgroundPosition: "-120px 0",
  },
  {
    id: "campaignMonitor",
    delay: 0.35,
    scale: 0.7,
    color: "#fff",
    backgroundPosition: "-160px -40px",
  },
];

export default function HeroLogos() {
  return (
    <AnimatePresence>
      <div className="hero-squares">
        {LOGOS.map((logo) => (
          <HeroSquare key={logo.id} {...logo} />
        ))}
      </div>
    </AnimatePresence>
  );
}
