import React from "react";
import { AnimatePresence } from "framer-motion";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { Box, Container, useBreakpoint } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import Sidebar from "./components/Sidebar";
import Welcome from "./steps/Welcome";
import Introduction from "./steps/Introduction";
import Overview from "./steps/Overview";
import PreviousWork from "./steps/PreviousWork";
import WorkPreferences from "./steps/WorkPreferences";
import IdealProject from "./steps/IdealProject";
import Loading from "src/components/Loading";
import { useGetSpecialist } from "./queries";

export default function ClientApplication() {
  const { notify } = useNotifications();
  const location = useLocation();
  const viewer = useViewer();
  const history = useHistory();
  const forwards = history.action === "PUSH";
  const largeScreen = useBreakpoint("lUp");

  if (viewer.isClient) {
    notify("You already registered as a client");
    history.push("/");
  }

  const { data, loading } = useGetSpecialist(viewer.id);
  if (loading) return <Loading />;
  const { specialist, countries, skills, industries } = data;

  return (
    <div>
      {largeScreen ? <Sidebar specialist={specialist} /> : null}
      <Box paddingLeft={{ l: "300px" }}>
        <Container paddingY={10} paddingX={[4, 4, 6, 8]} maxWidth="750px">
          <AnimatePresence
            initial={false}
            custom={{ largeScreen, forwards }}
            exitBeforeEnter
          >
            <Switch location={location} key={location.pathname}>
              <Route path="/freelancers/apply/introduction">
                <Introduction specialist={specialist} countries={countries} />
              </Route>
              <Route path="/freelancers/apply/overview">
                <Overview specialist={specialist} />
              </Route>
              <Route path="/freelancers/apply/experience">
                <PreviousWork specialist={specialist} />
              </Route>
              <Route path="/freelancers/apply/preferences">
                <WorkPreferences
                  skills={skills}
                  industries={industries}
                  specialist={specialist}
                />
              </Route>
              <Route path="/freelancers/apply/ideal_project">
                <IdealProject specialist={specialist} />
              </Route>
              <Route>
                <Welcome specialist={specialist} />
              </Route>
            </Switch>
          </AnimatePresence>
        </Container>
      </Box>
    </div>
  );
}
