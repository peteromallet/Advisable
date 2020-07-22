import { matchPath } from "react-router-dom";
import ContinueApplication from "./ContinueApplication";
import AboutCompany from "./AboutCompany";
import AboutRequirements from "./AboutRequirements";
import AboutPreferences from "./AboutPreferences";
import SignupStatus from "./SignupStatus";
import StartApplication from "./StartApplication";

export const STEPS = [
  {
    title: "Personal Data",
    component: StartApplication,
    path: "/clients/signup",
    exact: true,
  },
  {
    title: "About Your Company",
    component: AboutCompany,
    path: "/clients/signup/about_your_company",
  },
  {
    title: "About Your Requirements",
    component: AboutRequirements,
    path: "/clients/signup/about_your_requirements",
  },
  {
    title: "About Your Preferences",
    component: AboutPreferences,
    path: "/clients/signup/about_your_preferences",
  },
  {
    title: "Sign-up Status",
    component: SignupStatus,
    path: "/clients/signup/status",
  },
];

export const currentStep = () =>
  STEPS.find((step) =>
    matchPath(window.location.pathname, { path: step.path }),
  );

export default STEPS;
