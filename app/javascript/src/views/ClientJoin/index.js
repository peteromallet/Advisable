import React from "react";
import { AnimatePresence } from "framer-motion";
import { Redirect, Switch, useLocation } from "react-router";
import useViewer from "src/hooks/useViewer";
import useSteps from "src/hooks/useSteps";
import steps from "./Steps";
import OrbitsBackground from "./OrbitsBackground";
import { Box, useBreakpoint } from "@advisable/donut";
import OrbitsContent from "./OrbitsContent";
import Footer from "./Footer";
import Header from "./Header";

function ClientJoin() {
  const { routes, currentStepIndex, forwards } = useSteps(steps);
  const location = useLocation();
  const largeScreen = useBreakpoint("xlUp");
  const viewer = useViewer();

  // Redirect to root if client or specialist logged in
  if (
    (viewer?.isClient && viewer?.needsToSetAPassword === false) ||
    (viewer?.isSpecialist && viewer?.applicationStage !== "Started") ||
    (viewer?.isSpecialist && viewer?.needsToSetAPassword === false)
  ) {
    return <Redirect to="/" />;
  }

  return (
    <Box minHeight="100vh" height="100%" position="relative">
      <OrbitsBackground step={currentStepIndex} />
      <Box
        px={{ _: 5, xl: 16 }}
        position="relative"
        minHeight="100vh"
        height="100%"
        // grid props
        display="grid"
        alignContent={{ _: "start", xl: "stretch" }}
        justifyContent="center"
        gridColumnGap="3.33%"
        gridRowGap={{ _: 9, xl: 0 }}
        gridTemplateColumns={{ _: "auto", xl: "auto 640px" }}
        gridTemplateRows={{
          _: "48px auto auto 56px",
          xl: "72px auto 72px",
        }}
        gridTemplateAreas={{
          _: `
            "header"
            "orbits-content"
            "card"
            "footer"
          `,
          xl: `
            "header header"
            "orbits-content card"
            "footer footer"
          `,
        }}
      >
        <Header />
        <OrbitsContent
          step={currentStepIndex}
          custom={{ forwards, largeScreen }}
        />
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          custom={{ forwards, largeScreen }}
        >
          <Switch location={location} key={location.pathname}>
            {routes}
          </Switch>
        </AnimatePresence>
        {largeScreen ? <Footer /> : null}
      </Box>
      {!largeScreen ? <Footer /> : null}
    </Box>
  );
}

export default ClientJoin;
