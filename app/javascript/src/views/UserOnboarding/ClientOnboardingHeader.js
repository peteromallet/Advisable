import React, { useMemo } from "react";
import { useLocation, matchPath, resolvePath } from "react-router-dom";
import Progress from "./Progress";
import Logo from "src/components/Logo";
import LogoMark from "src/components/LogoMark";
import useMediaQuery from "src/utilities/useMediaQuery";

export default function ClientOnboardingHeader({ steps }) {
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 720px)");

  const matchingStepIndex = useMemo(() => {
    return steps.findIndex((step) => {
      const resolved = resolvePath(step.path, "/setup");
      return matchPath(resolved?.pathname, location.pathname);
    });
  }, [location, steps]);

  return (
    <header className="flex items-center px-5 onboarding_heading">
      <div className="flex flex-1 justify-start mr-auto">
        {isDesktop ? <Logo /> : <LogoMark />}
      </div>
      <div className="flex flex-1 justify-center">
        <Progress matchingStepIndex={matchingStepIndex} />
      </div>
      <div className="flex flex-1 justify-end ml-auto text-right">
        {matchingStepIndex >= 0 && (
          <span className="hidden text-base md:block w-[80px] text-neutral500">
            Step {matchingStepIndex + 1} of {steps.length}
          </span>
        )}
      </div>
    </header>
  );
}
