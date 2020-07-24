import { matchPath } from "react-router-dom";
import AboutCompany from "./AboutCompany";
import AboutRequirements from "./AboutRequirements";
import AboutPreferences from "./AboutPreferences";
import SignupStatus from "./SignupStatus";
import StartApplication from "./StartApplication";
import ThankYouReminderSet from "./ThankYou/ReminderSet";
import ThankYouCallBooked from "./ThankYou/CallBooked";
import ThankYouCallShortly from "./ThankYou/CallShortly";
import EmailNotAllowed from "./EmailNotAllowed";

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
  // Passive steps. Ignored by steps indicator
  {
    title: "Reminder Set",
    component: ThankYouReminderSet,
    path: "/clients/signup/thank-you-reminder-set",
    passive: true,
  },
  {
    title: "Your call is booked",
    component: ThankYouCallBooked,
    path: "/clients/signup/thank-you-call-is-booked",
    passive: true,
  },
  {
    title: "We will call you shortly",
    component: ThankYouCallShortly,
    path: "/clients/signup/thank-you-call-you-shortly",
    passive: true,
  },
  {
    title: "Email not allowed",
    component: EmailNotAllowed,
    path: "/clients/signup/email-not-allowed",
    passive: true,
  },
];

export const currentStep = () =>
  STEPS.find((step) =>
    matchPath(window.location.pathname, { path: step.path }),
  );

export default STEPS;
