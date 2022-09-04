import React from "react";
import { motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { Client, Freelancer } from "./SingupFormVariants";
import Intro from "./Intro";
import Logo from "src/components/Logo";
import { AnimatePresence } from "framer-motion";
import { Link, useBreakpoint } from "@advisable/donut";
import EmailStep from "./EmailStep";

export default function Join() {
  const location = useLocation();
  const isMobile = useBreakpoint("s");

  return (
    <div className="relative onboarding flex flex-col lg:min-h-screen">
      <header className="flex items-center justify-center my-7 sm:my-10 md:my-12">
        <Logo />
      </header>
      <main className="flex items-center flex-col px-4">
        <AnimatePresence initial={false} exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route index element={<Intro />} />
            <Route path="client" element={<Client />} />
            <Route path="client/email" element={<EmailStep />} />
            <Route path="freelancer" element={<Freelancer />} />
            <Route path="freelancer/email" element={<EmailStep />} />
          </Routes>
        </AnimatePresence>
      </main>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          key={isMobile && location.pathname}
          className="p-12 pt-10 text-center"
        >
          <div className="text-base text-neutral700 mb-1 font-normal tracking-tight">
            Already have an account?{" "}
          </div>
          <Link
            to="/login"
            className="text-blue700 hover:text-blue500 underline underline-offset-8 decoration-blue100 hover:decoration-blue200 decoration-2"
          >
            Login
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
