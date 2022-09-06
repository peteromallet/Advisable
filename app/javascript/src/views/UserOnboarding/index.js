import "./onboarding.css";
import React, { createElement } from "react";
import { Route, Routes } from "react-router-dom";
import Company from "./Company";
import Industry from "./Industry";
import Interests from "./Interests";
import { useOnboardingData } from "./queries";
import { Loading } from "src/components";
import CreatingFeed from "./CreatingFeed";
import Hiring from "./Hiring";
import ClientOnboardingHeader from "./ClientOnboardingHeader";
import useViewer from "src/hooks/useViewer";
import FreelancerOnboardingHeader from "./FreelancerOnboardingHeader";

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
  const viewer = useViewer();
  const { loading, data } = useOnboardingData();

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col lg:min-h-screen onboarding">
      {viewer.isClient ? (
        <ClientOnboardingHeader steps={STEPS} />
      ) : (
        <FreelancerOnboardingHeader />
      )}
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
