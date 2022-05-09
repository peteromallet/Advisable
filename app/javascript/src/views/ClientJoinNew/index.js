import React from "react";
import { motion } from "framer-motion";
import queryString from "query-string";
import { useLocation } from "react-router";
import { Link, Heading } from "@advisable/donut";
import useMediaQuery from "src/utilities/useMediaQuery";
import LogoMark from "src/components/LogoMark";
import Divider from "src/components/Divider";
import Logo from "src/components/Logo";
import ArticleCardsComposition from "src/components/ArticleCardsComposition";
import GeneralForm from "./GeneralForm";
import EmailForm from "./EmailForm";

export default function ClientJoin() {
  const location = useLocation();
  const { email } = queryString.parse(location.search);
  const isDesktop = useMediaQuery("(min-width: 720px)");

  return (
    <div className="onboarding flex flex-col lg:min-h-screen">
      <header className="onboarding_heading px-5 flex items-center">
        <div className="flex-1 flex justify-start mr-auto">
          {isDesktop ? <Logo /> : <LogoMark />}
        </div>
      </header>
      <div className="w-full px-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[640px] mx-auto bg-white shadow-xl rounded-xl"
        >
          <ArticleCardsComposition />
          <div className="pt-3 pb-12 px-6 sm:pt-6 sm:pb-14 sm:px-12">
            <div className="text-center mb-8">
              <Heading size="4xl" marginBottom={3}>
                Start discovering SaaS projects
              </Heading>
              <div className="text-lg text-neutral700">
                Already have an account?{" "}
                <Link to="/login" variant="underlined">
                  Login
                </Link>
              </div>
            </div>
            {email ? <EmailForm /> : <GeneralForm />}
            <Divider py={8} />
            <div className="text-center">
              <div className="text-base mb-2 text-neutral700 font-[480] tracking-tight">
                Looking to create a freelancer account?
              </div>
              <Link to="/freelancers/join" fontSize="m" variant="underlined">
                Signup as a freelancer
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
