import React from "react";
import { Switch, Redirect } from "react-router-dom";
import useViewer from "../../hooks/useViewer";
import useSteps from "./useSteps";
import steps from "./Steps";
import Testimonials from "./Testimonials";
import { Box, useTheme } from "@advisable/donut";
import { Step } from "./styles";
import Progress from "./Progress";

function ClientSignup() {
  const { routes, currentActiveStepIndex, numberOfActiveSteps } = useSteps(
    steps,
  );
  const viewer = useViewer();
  const theme = useTheme();

  React.useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
  }, []);

  if (viewer) return <Redirect to="/" />;

  const currentStepNumber = currentActiveStepIndex;
  const progressLength = (currentStepNumber / numberOfActiveSteps) * 100;

  return (
    <>
      <Testimonials />
      <Box paddingRight={{ _: null, l: 550 }}>
        <Box py="xxl" maxWidth={600} margin="0 auto" px="m">
          {currentStepNumber !== -1 && (
            // Show steps only if route part of steps
            <>
              <Step>
                Step {currentStepNumber} of {numberOfActiveSteps}
              </Step>
              <Progress amount={progressLength} />
            </>
          )}
          <Switch>{routes}</Switch>
        </Box>
      </Box>
    </>
  );
}

export default ClientSignup;
