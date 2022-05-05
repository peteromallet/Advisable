import React from "react";
import { motion } from "framer-motion";
import useMediaQuery from "src/utilities/useMediaQuery";
import LogoMark from "src/components/LogoMark";
import Logo from "src/components/Logo";
import ArticleCardsComposition from "src/components/ArticleCardsComposition";
import StartApplication from "./StartApplication";

export default function ClientJoin() {
  const isDesktop = useMediaQuery("(min-width: 720px)");
  return (
    <div className="onboarding flex flex-col lg:min-h-screen">
      <header className="onboarding_heading px-5 flex items-center">
        <div className="flex-1 flex justify-start mr-auto">
          {isDesktop ? <Logo /> : <LogoMark />}
        </div>
      </header>
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[640px] mx-auto bg-white shadow-xl rounded-xl"
        >
          <ArticleCardsComposition />
          <div className="pt-6 pb-14 px-12">
            <StartApplication />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
