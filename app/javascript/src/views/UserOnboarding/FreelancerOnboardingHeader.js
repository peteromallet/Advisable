import React from "react";
import Logo from "src/components/Logo";
import LogoMark from "src/components/LogoMark";
import useMediaQuery from "src/utilities/useMediaQuery";

export default function FreelancerOnboardingHeader() {
  const isDesktop = useMediaQuery("(min-width: 720px)");

  return (
    <header className="flex justify-center items-center onboarding_heading">
      {isDesktop ? <Logo /> : <LogoMark />}
    </header>
  );
}
