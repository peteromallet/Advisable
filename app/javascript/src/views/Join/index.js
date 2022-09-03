import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Client from "./Client";
import Freelancer from "./Freelancer";
import Intro from "./Intro";
import Logo from "src/components/Logo";
import LogoMark from "src/components/LogoMark";
import useMediaQuery from "src/utilities/useMediaQuery";
import { AnimatePresence } from "framer-motion";
import { useBreakpoint, Link } from "@advisable/donut";
import EmailForm from "./EmailForm";

export default function Join() {
  const largeScreen = useBreakpoint("lUp");
  const isDesktop = useMediaQuery("(min-width: 720px)");
  const location = useLocation();

  return (
    <div className="relative onboarding flex flex-col lg:min-h-screen">
      <header className="onboarding_heading flex items-center justify-center mb-8 mt-6">
        {isDesktop ? <Logo /> : <LogoMark />}
      </header>
      <main className="flex items-center flex-col">
        <div className="min-h-[600px]">
          <AnimatePresence
            custom={{ largeScreen }}
            initial={false}
            exitBeforeEnter
          >
            <Routes location={location} key={location.pathname}>
              <Route index element={<Intro />} />
              <Route path="client" element={<Client />} />
              <Route path="client/email" element={<EmailForm />} />
              <Route path="freelancer" element={<Freelancer />} />
              <Route path="freelancer/email" element={<EmailForm />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
