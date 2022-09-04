import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Client from "./Client";
import Freelancer from "./Freelancer";
import Intro from "./Intro";
import Logo from "src/components/Logo";
import { AnimatePresence } from "framer-motion";
import { useBreakpoint, Link } from "@advisable/donut";
import EmailStep from "./EmailStep";

export default function Join() {
  const largeScreen = useBreakpoint("lUp");
  const location = useLocation();

  return (
    <div className="relative onboarding flex flex-col lg:min-h-screen">
      <header className="onboarding_heading flex items-center justify-center mb-8 mt-6">
        <Logo />
      </header>
      <main className="flex items-center flex-col">
        <div className="min-h-[540px]">
          <AnimatePresence
            custom={{ largeScreen }}
            initial={false}
            exitBeforeEnter
          >
            <Routes location={location} key={location.pathname}>
              <Route index element={<Intro />} />
              <Route path="client" element={<Client />} />
              <Route path="client/email" element={<EmailStep />} />
              <Route path="freelancer" element={<Freelancer />} />
              <Route path="freelancer/email" element={<EmailStep />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
      <div className="p-12 pt-10 text-center">
        <div className="text-base text-neutral700 mb-1 font-normal tracking-tight">
          Already have an account?{" "}
        </div>
        <Link
          to="/login"
          className="text-blue700 hover:text-blue500 underline underline-offset-8 decoration-blue100 hover:decoration-blue200 decoration-2"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
