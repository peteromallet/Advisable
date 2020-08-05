import { matchPath } from "react-router-dom";
import AboutCompany from "./AboutCompany";
import AboutRequirements from "./AboutRequirements";
import AboutPreferences from "./AboutPreferences";
import SignupStatus from "./SignupStatus";
import StartApplication from "./StartApplication";
import EmailNotAllowed from "./EmailNotAllowed";
import ThankYou from "./ThankYou";

export const STEPS = [
  {
    title: "Start Application",
    component: StartApplication,
    path: "/clients/signup",
    exact: true,
    push: true,
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
    push: true,
  },
  {
    title: "About Your Preferences",
    component: AboutPreferences,
    path: "/clients/signup/about_your_preferences",
    push: true,
  },
  {
    title: "Sign-up Status",
    component: SignupStatus,
    path: "/clients/signup/status",
    push: true,
  },
  // Passive steps. Ignored by steps indicator
  {
    title: "Reminder Set",
    component: ThankYou("ReminderSet"),
    path: "/clients/signup/thank-you-reminder-set",
    passive: true,
    push: true,
  },
  {
    title: "Your call is booked",
    component: ThankYou("CallBooked"),
    path: "/clients/signup/thank-you-call-is-booked",
    passive: true,
    push: true,
  },
  {
    title: "We will call you shortly",
    component: ThankYou("CallShortly"),
    path: "/clients/signup/thank-you-call-you-shortly",
    passive: true,
    push: true,
  },
  {
    title: "Email not allowed",
    component: EmailNotAllowed,
    path: "/clients/signup/email-not-allowed",
    passive: true,
    push: true,
  },
];

export const currentStep = () =>
  STEPS.find((step) =>
    matchPath(window.location.pathname, { path: step.path }),
  );

export default STEPS;
