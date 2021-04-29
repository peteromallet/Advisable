import React from "react";
import { Switch, Redirect, useLocation, matchPath } from "react-router-dom";
import Route from "src/components/Route";
import { AnimatePresence, motion } from "framer-motion";
import { Box, useTheme, useBreakpoint } from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import useViewer from "src/hooks/useViewer";
import Testimonials from "./Testimonials";
import { Step } from "./styles";
import Progress from "./Progress";
// Steps
import StartApplication from "./Steps/StartApplication";
import AboutCompany from "./Steps/AboutCompany";
import AboutRequirements from "./Steps/AboutRequirements";
import AboutPreferences from "./Steps/AboutPreferences";
import SignupStatus from "./Steps/SignupStatus";
import EmailNotAllowed from "./Steps/EmailNotAllowed";
import { ReminderSet, CallShortly, CallBooked } from "./Steps/ThankYou";

const STEPS_PATH = [
  "/clients/signup",
  "/clients/signup/about_your_company",
  "/clients/signup/about_your_requirements",
  "/clients/signup/about_your_preferences",
  "/clients/signup/status",
];

function ClientSignup() {
  const location = useLocation();
  const viewer = useViewer();
  const theme = useTheme();
  const isDesktop = useBreakpoint("lUp");
  const notifications = useNotifications();

  React.useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (viewer) {
    notifications.notify("You have an account and already signed in");
    return <Redirect to="/" />;
  }

  const currentStepIndex = STEPS_PATH.findIndex((path) =>
    matchPath(location.pathname, { path, exact: true }),
  );
  const currentStepNumber = currentStepIndex > -1 ? currentStepIndex : 0;
  const numberOfSteps = STEPS_PATH.length - 1;
  const progressLength = (currentStepNumber / numberOfSteps) * 100;
  const displayProgress = currentStepIndex !== -1;

  return (
    <Box display="flex" flexDirection="row">
      {isDesktop && <Testimonials />}
      <Box
        ml={isDesktop ? "calc(40% + 3%)" : "auto"}
        py={["l", "4%"]}
        maxWidth={600}
        width="100%"
        mr="auto"
        px="m"
      >
        <motion.div
          animate={{ opacity: displayProgress ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <Step>
            Step {currentStepNumber} of {numberOfSteps}
          </Step>
          <Progress amount={progressLength} />
        </motion.div>
        <AnimatePresence initial={false} exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/clients/signup" component={StartApplication} />
            <Route
              path="/clients/signup/about_your_company"
              component={AboutCompany}
            />
            <Route
              path="/clients/signup/about_your_requirements"
              component={AboutRequirements}
            />
            <Route
              path="/clients/signup/about_your_preferences"
              component={AboutPreferences}
            />
            <Route path="/clients/signup/status" component={SignupStatus} />
            <Route
              path="/clients/signup/thank-you-reminder-set"
              component={ReminderSet}
            />
            <Route
              path="/clients/signup/thank-you-call-is-booked"
              component={CallBooked}
            />
            <Route
              path="/clients/signup/thank-you-call-you-shortly"
              component={CallShortly}
            />
            <Route
              path="/clients/signup/email-not-allowed"
              component={EmailNotAllowed}
            />
          </Switch>
        </AnimatePresence>
      </Box>
    </Box>
  );
}

export default ClientSignup;
