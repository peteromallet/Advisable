import React from "react";
import { useQuery } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { Box, Container, useBreakpoint } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import Sidebar from "./components/Sidebar";
import Loading from "src/components/Loading";
import { CLIENT_APPLICATION_DATA } from "./queries";
// Steps
import CompanyOverview from "./steps/CompanyOverview";
import CompanyStage from "./steps/CompanyStage";
import Goals from "./steps/Goals";
import Preferences from "./steps/Preferences";
import Welcome from "./steps/Welcome";

export default function ClientApplication() {
  const { notify } = useNotifications();
  const location = useLocation();
  const viewer = useViewer();
  const history = useHistory();
  const forwards = history.action === "PUSH";
  const largeScreen = useBreakpoint("lUp");

  if (viewer.isSpecialist) {
    notify("You already registered as a freelancer");
    history.push("/");
  }

  const { data, loading } = useQuery(CLIENT_APPLICATION_DATA);
  if (loading) return <Loading />;
  const { clientApplication, industries } = data;

  return (
    <div>
      {largeScreen ? <Sidebar clientApplication={clientApplication} /> : null}
      <Box paddingLeft={{ l: "300px" }}>
        <Container paddingY={10} paddingX={[4, 4, 6, 8]} maxWidth="750px">
          <AnimatePresence
            initial={false}
            custom={{ largeScreen, forwards }}
            exitBeforeEnter
          >
            <Switch location={location} key={location.pathname}>
              <Route path="/clients/apply/company-overview">
                <CompanyOverview
                  clientApplication={clientApplication}
                  industries={industries}
                />
              </Route>
              <Route path="/clients/apply/company-stage">
                <CompanyStage clientApplication={clientApplication} />
              </Route>
              <Route path="/clients/apply/goals">
                <Goals clientApplication={clientApplication} />
              </Route>
              <Route path="/clients/apply/preferences">
                <Preferences clientApplication={clientApplication} />
              </Route>
              <Route>
                <Welcome />
              </Route>
            </Switch>
          </AnimatePresence>
        </Container>
      </Box>
    </div>
  );
}
