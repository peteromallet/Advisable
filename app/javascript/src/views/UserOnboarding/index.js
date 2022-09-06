import React, { useMemo, createElement } from "react";
import {
  useLocation,
  Route,
  Routes,
  matchPath,
  resolvePath,
} from "react-router-dom";
import Company from "./Company";
import Industry from "./Industry";
import Interests from "./Interests";
import Logo from "src/components/Logo";
import { useOnboardingData } from "./queries";
import { Loading } from "src/components";
import "./onboarding.css";
import Progress from "./Progress";
import CreatingFeed from "./CreatingFeed";
import useMediaQuery from "src/utilities/useMediaQuery";
import LogoMark from "src/components/LogoMark";
import Hiring from "./Hiring";

export const STEPS = [
  {
    title: "Company",
    path: "company",
    component: Company,
  },
  {
    title: "Industry",
    path: "industry",
    component: Industry,
  },
  {
    title: "Hiring",
    path: "hiring",
    component: Hiring,
  },
  {
    title: "Topics",
    path: "interests",
    component: Interests,
  },
];

export default function UserOnboarding() {
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 720px)");
  const { loading, data } = useOnboardingData();

  const matchingStepIndex = useMemo(() => {
    return STEPS.findIndex((step) => {
      const resolved = resolvePath(step.path, "/setup");
      return matchPath(resolved?.pathname, location.pathname);
    });
  }, [location]);

  if (loading) return <Loading />;

  return (
    <div className="onboarding flex flex-col lg:min-h-screen">
      <header className="onboarding_heading px-5 flex items-center">
        <div className="flex-1 flex justify-start mr-auto">
          {isDesktop ? <Logo /> : <LogoMark />}
        </div>
        <div className="flex-1 flex justify-center">
          <Progress matchingStepIndex={matchingStepIndex} />
        </div>
        <div className="flex-1 flex justify-end text-right ml-auto">
          {matchingStepIndex >= 0 && (
            <span className="hidden md:block w-[80px] text-base text-neutral500">
              Step {matchingStepIndex + 1} of {STEPS.length}
            </span>
          )}
        </div>
      </header>
      <div className="onboarding_content flex flex-1 py-2 pb-5 md:py-10 px-5 lg:pb-0">
        <Routes>
          {STEPS.map((step) => (
            <Route
              key={step.title}
              path={step.path}
              element={createElement(step.component, { data })}
            />
          ))}
          <Route path="complete" element={<CreatingFeed />} />
        </Routes>
      </div>
    </div>
  );
}
