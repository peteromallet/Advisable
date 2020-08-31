import React from "react";
import PropTypes from "prop-types";
import { isEmpty, filter } from "lodash-es";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  matchPath,
} from "react-router-dom";
import { Box, useBreakpoint, useTheme } from "@advisable/donut";
import Terms from "./Terms";
import Overview from "./Overview";
import Questions from "./Questions";
import References from "./References";
import ApplicationFlowSidebar from "./ApplicationFlowSidebar";
import SetupDots from "./SetupDots";
import { AnimatePresence, motion } from "framer-motion";
import usePathnameQueue from "../../utilities/usePathnameQueue";

const cardAnimations = {
  enter: ({ largeScreen, forwards }) => {
    return {
      x: largeScreen ? 0 : forwards ? 80 : -80,
      y: largeScreen ? (forwards ? 80 : -80) : 0,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    y: 0,
    zIndex: 1,
    opacity: 1,
  },
  exit: ({ largeScreen, forwards }) => {
    return {
      y: largeScreen ? (forwards ? -80 : 80) : 0,
      x: largeScreen ? 0 : forwards ? -80 : 80,
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.3 },
    };
  },
};

const ApplicationFlow = ({ application, match }) => {
  const theme = useTheme();
  const mediumAndUp = useBreakpoint("mUp");
  const applicationId = match.params.applicationId;
  const largeScreen = useBreakpoint("lUp");
  const location = useLocation();
  const [currentPathname, previousPathname] = usePathnameQueue();

  // Some steps are able to be skipped. e.g the references step. The skipped
  // variable is an array of step names to keep track of the steps that have
  // been skipped.
  const [skipped, setSkipped] = React.useState([]);
  const skipStep = (step) => setSkipped([...skipped, step.name]);

  // Various parts of this flow need to act differently based on wether the user
  // is applying or updating an existing application.
  const isApplying = application.status === "Invited To Apply";

  // STEPS defines all of the various steps inside the application flow.
  // the user to jump between steps when they are updating an existing
  // Note how each step returns true if isApplying is false. This is to allow
  // application.
  const STEPS = [
    {
      exact: true,
      name: "Overview",
      to: "/",
      path: "/",
      component: Overview,
      isComplete: Boolean(application.introduction && application.availability),
    },
    {
      name: "Application Questions",
      to: "/questions/1",
      path: "/questions/:number?",
      component: Questions,
      hidden: application.project.questions.length === 0,
      isComplete:
        !isApplying ||
        filter(application.questions, (q) => !isEmpty(q.answer)).length >=
          application.project.questions.length,
    },
    {
      name: "References",
      to: "/references",
      path: "/references",
      key: "/references",
      component: References,
      isComplete:
        !isApplying ||
        skipped.indexOf("References") !== -1 ||
        application.previousProjects.length > 0,
    },
    {
      name: "Payment terms",
      to: "/terms",
      path: "/terms",
      component: Terms,
      isComplete:
        !isApplying ||
        Boolean(
          application.rate &&
            application.acceptsFee &&
            application.acceptsTerms,
        ),
    },
  ];

  const getStepIndexFromPath = (pathname) =>
    STEPS.findIndex((step) => {
      return matchPath(pathname, {
        path: `/invites/:id/apply${step.path}`,
        exact: step.exact,
      });
    });

  const currentStepIndex = getStepIndexFromPath(currentPathname);
  const previousStepIndex = getStepIndexFromPath(previousPathname);

  React.useEffect(() => {
    theme.updateTheme({
      background: mediumAndUp || currentStepIndex === 2 ? "default" : "white",
    });
    return () => theme.updateTheme({ background: "default" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediumAndUp, currentStepIndex]);

  const forwards = previousStepIndex <= currentStepIndex;
  const currentStepKey = STEPS[currentStepIndex].key || location.pathname;

  return (
    <Box display="flex">
      {largeScreen && (
        <ApplicationFlowSidebar
          application={application}
          steps={STEPS}
          applicationId={applicationId}
        />
      )}
      <Box
        mx="auto"
        width="100%"
        position="relative"
        my={{ _: 0, m: "64px" }}
        padding={{ _: "24px", m: "0" }}
        maxWidth={{ _: "100%", m: "680px" }}
      >
        {!largeScreen && (
          <SetupDots
            marginBottom={{ _: "m", m: "l" }}
            justifyContent={{ _: "start", m: "center" }}
          />
        )}
        <AnimatePresence
          initial={false}
          exitBeforeEnter
          custom={{ largeScreen, forwards }}
        >
          <Switch location={location} key={currentStepKey}>
            {STEPS.map((step, i) => {
              const Component = step.component;
              const previousStep = STEPS[i - 1];
              const previousStepComplete = previousStep
                ? previousStep.isComplete
                : true;

              return (
                <Route
                  key={step.path}
                  exact={step.exact}
                  path={`/invites/:applicationId/apply${step.path}`}
                  render={(props) =>
                    previousStepComplete ? (
                      <motion.div
                        transition={{ duration: 0.4 }}
                        variants={cardAnimations}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={{ largeScreen, forwards }}
                      >
                        <Component
                          steps={STEPS}
                          currentStep={i}
                          application={application}
                          skipStep={() => skipStep(step)}
                          {...props}
                        />
                      </motion.div>
                    ) : (
                      <Redirect
                        to={`/invites/${applicationId}/apply${previousStep.path}`}
                      />
                    )
                  }
                />
              );
            })}
          </Switch>
        </AnimatePresence>
      </Box>
    </Box>
  );
};
ApplicationFlow.propTypes = {
  application: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
};

export default ApplicationFlow;
