import React from "react";
import { Switch, Redirect, useLocation } from "react-router-dom";
import useViewer from "../../hooks/useViewer";
import useSteps from "./useSteps";
import steps from "./Steps";
import Testimonials from "./Testimonials";
import { Box, useTheme, useBreakpoint } from "@advisable/donut";
import { Step } from "./styles";
import Progress from "./Progress";
import { AnimatePresence } from "framer-motion";

function ClientSignup() {
  const { routes, currentActiveStepIndex, numberOfActiveSteps } = useSteps(
    steps,
  );
  const viewer = useViewer();
  const theme = useTheme();
  const location = useLocation();
  const isDesktop = useBreakpoint("lUp");

  React.useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
  }, []);

  if (viewer) return <Redirect to="/" />;

  const currentStepNumber = currentActiveStepIndex;
  const numberOfSteps = numberOfActiveSteps - 1;
  const progressLength = (currentStepNumber / numberOfSteps) * 100;

  const currentStepNumber = currentStepIndex();

  return (
    <Box display="flex" flexDirection="row">
      {isDesktop && <Testimonials />}
      <Box
        py={["l", "xxxl"]}
        maxWidth={600}
        width="100%"
        ml={isDesktop ? "calc(40% + 60px)" : "auto"}
        mr="auto"
        px="m"
      >
        {currentStepNumber !== -1 && (
          // Show steps only for active steps
          <>
            <Step>
              Step {currentStepNumber} of {numberOfSteps}
            </Step>
            <Progress amount={progressLength} />
          </>
        )}
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            {routes}
          </Switch>
        </AnimatePresence>
      </Box>
    </Box>
  );
}

export default ClientSignup;
