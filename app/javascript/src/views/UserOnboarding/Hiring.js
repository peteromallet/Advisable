import React, { cloneElement } from "react";
import { motion } from "framer-motion";
import LighthouseIllustration from "src/illustrations/zest/lighthouse";
import composeStyles from "src/utilities/composeStyles";
import { useUpdateCompany } from "./queries";
import { useNavigate } from "react-router-dom";
import SearchIllustration from "src/illustrations/zest/search";
import CandidateIllustration from "src/illustrations/zest/candidate";
import { ArrowSmRight } from "@styled-icons/heroicons-outline";
import { trackEvent, updateTraits } from "src/utilities/segment";

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
    updateTraits({ intent: option });
    navigate("/setup/interests");
  };

  return (
    <div className={optionClasses()} onClick={handleClick} data-testid={option}>
      <div className="hidden place-items-center md:grid w-[150px] h-[180px]">
        {cloneElement(illustration)}
      </div>
      <div className="flex-1 md:text-center">
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
      <div className="mx-auto mb-12 text-center max-w-[500px]">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight leading-none md:text-3xl text-blue900">
          Are you interested in connecting with the people behind the projects?
        </h2>
        <p className="text-lg text-neutral900">
          They can give you advice, mentorship or hands-on support!
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 mx-auto md:grid-cols-3 md:gap-8 max-w-[860px]">
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
