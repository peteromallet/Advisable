import React, { cloneElement } from "react";
import { motion } from "framer-motion";
import composeStyles from "src/utilities/composeStyles";
import { useUpdateCompany } from "./queries";
import { useNavigate } from "react-router-dom";
import { ArrowSmRight } from "@styled-icons/heroicons-outline";
import { trackEvent, updateTraits } from "src/utilities/segment";
import ThumbsupIllustration from "src/illustrations/zest/thumbsup";
import BuildingBlocksIllustration from "src/illustrations/zest/buildingBlocks";

const optionClasses = composeStyles({
  base: `
    w-full
    sm:max-w-[280px]
    transition-all
    shadow-xl hover:shadow-2xl
    hover:-translate-y-1
    bg-white
    rounded-lg
    p-5 md:p-8
    cursor-pointer

    flex
    shrink-0
    items-center
    flex-row sm:flex-col
    gap-2
  `,
});

function HiringOption({ illustration, title, subtext, ...props }) {
  return (
    <div className={optionClasses()} {...props}>
      <div className="hidden place-items-center sm:grid w-[150px] h-[180px]">
        {cloneElement(illustration)}
      </div>
      <div className="flex-1 sm:text-center">
        <h5 className="text-lg font-medium">{title}</h5>
        <div className="text-[15px] text-neutral700">{subtext}</div>
      </div>
      <div>
        <ArrowSmRight className="w-5 h-5" />
      </div>
    </div>
  );
}

export default function Industry() {
  const navigate = useNavigate();
  const [update] = useUpdateCompany();

  const setSass = (isSaaS) => {
    update({ variables: { input: { industry: isSaaS ? "SaaS" : null } } });
    updateTraits({ industry: isSaaS ? "SaaS" : null });
    trackEvent("Setup - Industry");
    navigate("/setup/hiring");
  };

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto mb-12 text-center max-w-[500px]">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight leading-none md:text-3xl text-blue900">
          Are you from a SaaS company?
        </h2>
        <p className="text-lg text-neutral900">
          Advisable only has SaaS-related projects currently. If you’re not
          SaaS, your results won’t be very relevant.
        </p>
      </div>
      <div className="flex flex-col gap-2 justify-center mx-auto sm:flex-row md:gap-8 max-w-[860px]">
        <HiringOption
          data-testid="notSaaS"
          title="We're not SaaS"
          onClick={() => setSass(false)}
          subtext="The projects you see won’t be highly-relevant."
          illustration={
            <BuildingBlocksIllustration
              primaryColor="var(--color-rose-100)"
              secondaryColor="var(--color-neutral900)"
            />
          }
        />
        <HiringOption
          data-testid="saas"
          title="We are SaaS!"
          onClick={() => setSass(true)}
          subtext="You’ll see projects tailored to your space."
          illustration={
            <ThumbsupIllustration
              primaryColor="var(--color-blue-100)"
              secondaryColor="var(--color-neutral900)"
            />
          }
        />
      </div>
    </motion.div>
  );
}
