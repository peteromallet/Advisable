import React, { useMemo, createElement } from "react";
import {
  useLocation,
  Route,
  Routes,
  matchPath,
  resolvePath,
} from "react-router-dom";
import Welcome from "./Welcome";
import Company from "./Company";
import Industry from "./Industry";
import Audience from "./Audience";
import Interests from "./Interests";
import Logo from "src/components/Logo";
import { useOnboardingData } from "./queries";
import { Loading } from "src/components";
import "./onboarding.css";
import Progress from "./Progress";
import CreatingFeed from "./CreatingFeed";

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
    title: "Audience",
    path: "audience",
    component: Audience,
  },
  {
    title: "Interests",
    path: "interests",
    component: Interests,
  },
];

export default function UserOnboarding() {
  const location = useLocation();
  const { loading, data } = useOnboardingData();

  const matchingStepIndex = useMemo(() => {
    return STEPS.findIndex((step) => {
      const resolved = resolvePath(step.path, "/setup");
      return matchPath(resolved.pathname, location.pathname);
    });
  }, [location]);

  if (loading) return <Loading />;

  return (
    <div className="onboarding flex flex-col min-h-screen">
      <header className="onboarding_heading px-5 flex justify-between items-center">
        <Logo />
        <Progress matchingStepIndex={matchingStepIndex} />
        <div className="w-[80px] text-neutral600">
          Step {matchingStepIndex === -1 ? 0 : matchingStepIndex + 1} of{" "}
          {STEPS.length}
        </div>
      </header>
      <div className="onboarding_content flex flex-1">
        <Routes>
          <Route index element={<Welcome data={data} />} />
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
