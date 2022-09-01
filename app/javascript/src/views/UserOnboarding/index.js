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
    <div className="flex flex-col lg:min-h-screen onboarding">
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
              Step {matchingStepIndex + 1} of {STEPS.length}
            </span>
          )}
        </div>
      </header>
      <div className="flex flex-1 py-2 px-5 pb-5 md:py-10 lg:pb-0 onboarding_content">
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
