import "./styles.css";
import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import map from "./map.svg";
import useInterval from "src/hooks/useInterval";

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
      className="freelancer relative"
    >
      <motion.div
        className="absolute inset-0 rounded-full border border-solid border-white"
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
    <div className="w-[720px] z-0 h-full absolute bottom-0 right-5 select-none">
      {FREELANCER_MAP.map((index) => (
        <Freelancer key={index} visible={visibleFreelancers.includes(index)} />
      ))}
      <img src={map} className="w-full h-full object-contain" />
    </div>
  );
}

export default function SignupCTA() {
  return (
    <div className="signupCTA relative mt-12 shadow-xl bg-blue900 px-16 py-20 rounded-xl">
      <div className="z-10 relative">
        <h1 className="font-serif text-white text-4xl font-semibold tracking-tight leading-tight max-w-[520px] mb-5">
          Get full access to our network of marketing specialists
        </h1>
        <p className="text-white text-lg w-[460px] leading-relaxed mb-12 opacity-80">
          Advisable is home to the world's best marketing and growth projects -
          sign up to gain full access to all projects on Advisable and
          collaborate with the experts behind them.
        </p>
        <div className="flex gap-4">
          <Button size="lg">Get full access now</Button>
          <Button variant="whiteOutlined" size="lg">
            Share your project
          </Button>
        </div>
      </div>
      <Map />
    </div>
  );
}
