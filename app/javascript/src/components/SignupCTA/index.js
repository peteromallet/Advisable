import "./styles.css";
import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import map from "./map.svg";
import useInterval from "src/hooks/useInterval";
import { Link } from "react-router-dom";

function random(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function Freelancer({ visible = false }) {
  const initial = { opacity: 0, scale: 0 };

  const animate = useMemo(() => {
    return {
      opacity: 1,
      scale: random([0.8, 0.85, 0.9, 0.95, 1]),
    };
    // We only want to recalculate animate when visibility changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <motion.div
      initial={initial}
      animate={visible ? animate : initial}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.5 }}
      className="relative freelancer"
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-white border-solid"
        initial="initial"
        animate={visible ? "animate" : "initial"}
        variants={{
          initial: { scale: 1, opacity: 1 },
          animate: { scale: 2, opacity: 0 },
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </motion.div>
  );
}

const VISIBLE_FREELANCERS = 4;
const NUMBER_OF_FREELANCERS = 10;
const FREELANCER_MAP = [...new Array(NUMBER_OF_FREELANCERS)].map(
  (_, index) => index,
);

function initializeState() {
  const indices = [];
  for (let i = 0; i < VISIBLE_FREELANCERS; i++) {
    const filtered = FREELANCER_MAP.filter((f) => !indices.includes(f));
    const randomIndex = random(filtered);
    indices.push(randomIndex);
  }

  return indices;
}

function Map() {
  const [visibleFreelancers, setVisibleFreelancers] = React.useState(
    initializeState(),
  );

  const updateFreelancers = useCallback(() => {
    setVisibleFreelancers((existing) => {
      const filtered = FREELANCER_MAP.filter((f) => !existing.includes(f));
      const newIndex = random(filtered);
      return [newIndex, ...existing].slice(0, VISIBLE_FREELANCERS);
    });
  }, [setVisibleFreelancers]);

  useInterval(updateFreelancers, 2000);

  return (
    <div className="hidden absolute bottom-0 right-5 z-0 h-full select-none lg:block w-[720px]">
      {FREELANCER_MAP.map((index) => (
        <Freelancer key={index} visible={visibleFreelancers.includes(index)} />
      ))}
      <img src={map} className="object-contain w-full h-full" />
    </div>
  );
}

export default function SignupCTA() {
  return (
    <div className="relative -mt-[500px]">
      <div className="pointer-events-none h-[120px]" />
      <div
        style={{
          boxShadow:
            "0 12px 40px -8px rgb(0 0 0 / .6), 0 -40px 40px -24px rgb( 0 0 0 / .28)",
        }}
        className="relative py-12 px-10 rounded-2xl lg:py-20 lg:px-16 lg:-mx-8 signupCTA bg-blue900"
      >
        <div className="relative z-10">
          <h1 className="mb-5 font-serif text-4xl font-semibold tracking-tight leading-tight text-white lg:text-5xl max-w-[520px]">
            Explore 100s of case studies for free
          </h1>
          <p className="mb-12 leading-relaxed text-white opacity-80 md:text-lg max-w-[460px]">
            Get free access to our full library of SaaS marketing case studies.
            You only pay when you hire someone you discover through us!
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <Link to="/join" className="block">
              <Button className="w-full" size="lg">
                Get full access
              </Button>
            </Link>
            <Link to="/join/freelancer" className="block">
              <Button className="w-full" variant="whiteOutlined" size="lg">
                Share your project
              </Button>
            </Link>
          </div>
        </div>
        <Map />
      </div>
    </div>
  );
}
