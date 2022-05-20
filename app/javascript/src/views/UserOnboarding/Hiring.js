import React, { cloneElement } from "react";
import { motion } from "framer-motion";
import LighthouseIllustration from "src/illustrations/zest/lighthouse";
import composeStyles from "src/utilities/composeStyles";
import { useUpdateCompany } from "./queries";
import { useNavigate } from "react-router-dom";
import SearchIllustration from "src/illustrations/zest/search";
import CandidateIllustration from "src/illustrations/zest/candidate";
import { ArrowSmRight } from "@styled-icons/heroicons-outline";
import { trackEvent } from "src/utilities/segment";

const optionClasses = composeStyles({
  base: `
    transition-all
    shadow-xl hover:shadow-2xl
    hover:-translate-y-1
    bg-white
    rounded-lg
    p-5 md:p-8
    cursor-pointer

    flex
    items-center
    flex-row md:flex-col
    gap-2
  `,
});

function HiringOption({ illustration, title, subtext, option }) {
  const navigate = useNavigate();
  const [update] = useUpdateCompany();

  const handleClick = () => {
    update({ variables: { input: { intent: option } } });
    trackEvent("Setup - Hiring", { intent: option });
    navigate("/setup/interests");
  };

  return (
    <div className={optionClasses()} onClick={handleClick} data-testid={option}>
      <div className="place-items-center w-[150px] h-[180px] hidden md:grid">
        {cloneElement(illustration)}
      </div>
      <div className="md:text-center flex-1">
        <h5 className="text-lg font-medium">{title}</h5>
        <div className="text-[15px] text-neutral700">{subtext || option}</div>
      </div>
      <div>
        <ArrowSmRight className="w-5 h-5" />
      </div>
    </div>
  );
}

export default function Hiring() {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mx-auto max-w-[500px] mb-12">
        <h2 className="font-semibold text-2xl md:text-3xl tracking-tight leading-none mb-4 text-blue900">
          Interested in connecting with the people behind the projects?
        </h2>
        <p className="text-lg text-neutral900">
          They can give you advice, mentorship or hands-on support!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[860px] gap-2 md:gap-8 mx-auto">
        <HiringOption
          title="No"
          subtext="I’m only interested in reading projects"
          option="exploring"
          illustration={
            <SearchIllustration
              primaryColor="var(--color-rose-200)"
              secondaryColor="var(--color-neutral900)"
            />
          }
        />
        <HiringOption
          title="Maybe"
          subtext="I’m open to connecting with people"
          option="might hire"
          illustration={
            <LighthouseIllustration
              primaryColor="var(--color-blue-200)"
              secondaryColor="var(--color-neutral900)"
            />
          }
        />
        <HiringOption
          title="Yes"
          subtext="I definitely want to connect with people"
          option="hire"
          illustration={
            <CandidateIllustration
              primaryColor="var(--color-teal-300)"
              secondaryColor="var(--color-teal-900)"
            />
          }
        />
      </div>
    </motion.div>
  );
}
