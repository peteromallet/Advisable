import React, { createElement } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
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
  const { loading, data } = useOnboardingData();

  if (loading) return <Loading />;

  return (
    <div className="onboarding flex flex-col min-h-screen">
      <header className="onboarding_heading px-5 flex justify-between items-center">
        <Logo />
        <Progress />
        <div>Step count</div>
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
        </Routes>
      </div>
    </div>
  );
}
