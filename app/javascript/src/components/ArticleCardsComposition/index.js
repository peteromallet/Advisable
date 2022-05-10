import React from "react";
import { motion } from "framer-motion";
import { PlusSm } from "@styled-icons/heroicons-solid";
import avatarsAndLogos from "./projects.jpg";

function CaseStudyCard({
  heading,
  title,
  avatarPosition,
  logoPosition,
  gradient = "from-cyan-200 to-blue-300",
  ...props
}) {
  return (
    <motion.div className="onboarding-welcome-card" {...props}>
      <div
        className={`onboarding-welcome-card-header bg-gradient-to-br ${gradient}`}
      />
      <div className="pt-6 flex justify-center items-center mb-5">
        <div
          className="w-16 h-16 rounded-full bg-blue100 -mr-3 z-10 shadow"
          style={{
            backgroundImage: `url(${avatarsAndLogos})`,
            backgroundSize: "128px 192px",
            backgroundPosition: avatarPosition,
          }}
        />
        <div className="w-7 h-7 bg-white rounded-full shadow grid place-items-center z-20">
          <PlusSm className="w-5 h-5" />
        </div>
        <div
          className="w-16 h-16 rounded-full bg-white -ml-3 z-10 shadow"
          style={{
            backgroundImage: `url(${avatarsAndLogos})`,
            backgroundSize: "128px 192px",
            backgroundPosition: logoPosition,
          }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="px-4 uppercase text-[11px] font-medium text-neutral500 tracking-loose text-xs text-center mb-1"
      >
        {heading}
      </motion.div>
      <motion.h4
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="px-5 text-sm text-center font-medium leading-tight"
      >
        {title}
      </motion.h4>
    </motion.div>
  );
}

export default function ArticleCardsComposition() {
  return (
    <>
      <svg width="0" height="0">
        <defs>
          <clipPath id="headerCurve" clipPathUnits="objectBoundingBox">
            <path
              d="M 0,0
									L 1,0
									L 1,0.86
									C .65 1, .35 1, 0 0.86
									Z"
            />
          </clipPath>
        </defs>
      </svg>
      <div className="onboarding-welcome-header bg-gradient-to-br from-purple-700 to-blue700 h-[250px] rounded-t-xl">
        <CaseStudyCard
          initial={{ x: 0, y: 80, rotate: 0 }}
          animate={{ x: -124, y: 44, rotate: -10 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          heading="Ritika and Optimizely"
          title="Expanding into New Markets with Story-Driven Content"
          logoPosition="-64px 0"
        />
        <CaseStudyCard
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          heading="Shiyam and Freshworks"
          title="Generating over $1 million ARR for freshworks with paid search"
          avatarPosition="0 -64px"
          logoPosition="-64px -64px"
          gradient="from-purple-200 to-blue-300"
        />
        <CaseStudyCard
          initial={{ x: 0, y: 80, rotate: 0 }}
          animate={{ x: 124, y: 44, rotate: 10 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          heading="Graham and Intercom"
          title="Helping Intercom Take Ownership of their industry with SEO"
          avatarPosition="0 -128px"
          logoPosition="-64px -128px"
        />
      </div>
    </>
  );
}
