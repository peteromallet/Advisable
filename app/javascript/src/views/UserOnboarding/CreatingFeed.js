import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useShortlists } from "../Discover/queries";
import useInterval from "src/hooks/useInterval";

function Card(props) {
  return (
    <motion.div
      className="p-4 w-20 h-24 bg-white rounded-sm shadow-md absolute flex flex-col gap-2 overflow-hidden z-10"
      transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.3, 0.5] }}
      {...props}
    >
      <div className="h-1 w-full rounded-full bg-neutral100" />
      <div className="h-1 w-full rounded-full bg-neutral100" />
      <div className="h-1 w-full rounded-full bg-neutral100" />
      <div className="h-1 w-1/2 rounded-full bg-neutral100" />
    </motion.div>
  );
}

const SPACING = 116;

export default function CreatingFeed() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);

  const { data } = useShortlists();

  useInterval(() => {
    setSeconds(seconds + 1);
  }, [1000]);

  useEffect(() => {
    if (seconds >= 5 && data) {
      navigate("/");
    }
  }, [seconds, data, navigate]);

  return (
    <div className="w-full grid place-items-center">
      <div className="-mt-20">
        <div className="mb-12 relative h-24 mx-auto w-20">
          <Card
            animate={{
              opacity: [1, 0, 0],
              x: [-SPACING, -(SPACING * 2), -(SPACING * 2)],
            }}
          />
          <Card
            animate={{
              x: [0, -SPACING, -SPACING],
              scale: [1.1, 1, 1],
            }}
          />
          <Card
            animate={{
              x: [SPACING, 0, 0],
              scale: [1, 1, 1.1],
            }}
          />
          <Card
            animate={{
              opacity: [0, 1, 1],
              x: [SPACING * 2, SPACING, SPACING],
            }}
          />
          <div className="w-[108px] h-[124px] absolute -left-[14px] -top-[12px] rounded-[16px]">
            <div className="absolute inset-3 z-20 rounded-sm overflow-hidden">
              <motion.div
                className="h-full w-full absolute border-b border-solid border-blue200 bg-gradient-to-t from-blue50 to-transparent origin-top"
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  times: [0, 0.9, 1],
                }}
                animate={{
                  scaleX: [1.1, 1.1],
                  scaleY: [0, 0, 1, 0],
                }}
              />
            </div>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="108"
              height="124"
              fill="none"
              viewBox="0 0 108 124"
              className="-z-2"
              overflow="visible"
              transition={{
                repeat: Infinity,
                duration: 1.5,
                times: [0, 0.9, 1],
              }}
              animate={{
                scale: [1, 1, 1.02, 1],
                color: ["#DBDCE0", "#DBDCE0", "#153A87", "#DBDCE0"],
              }}
            >
              <path
                fill="currentColor"
                d="M20 0h-4C7.163 0 0 7.163 0 16v4h1v-4C1 7.716 7.716 1 16 1h4V0zM20 123h-4c-8.284 0-15-6.716-15-15v-4H0v4c0 8.837 7.163 16 16 16h4v-1zM88 124v-1h4c8.284 0 15-6.716 15-15v-4h1v4c0 8.837-7.163 16-16 16h-4zM88 1V0h4c8.837 0 16 7.163 16 16v4h-1v-4c0-8.284-6.716-15-15-15h-4z"
              ></path>
            </motion.svg>
          </div>
        </div>
        <div className="text-center w-[400px] mx-auto">
          <h4 className="text-lg font-semibold tracking-tight">
            Setting up your feed...
          </h4>
          <p>
            We're searching for projects that match your interests. This should
            only take a moment
          </p>
        </div>
      </div>
    </div>
  );
}
