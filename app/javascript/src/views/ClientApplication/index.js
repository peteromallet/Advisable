import React from "react";
import { useQuery } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { Container, useBreakpoint } from "@advisable/donut";
import GenericError from "src/views/GenericError";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import View from "src/components/View";
import Loading from "src/components/Loading";
import Sidebar from "./components/Sidebar";
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

  const { data, loading, error } = useQuery(CLIENT_APPLICATION_DATA);
  if (loading && !data) return <Loading />;
  if (error) return <GenericError />;
  const { clientApplication, industries } = data;

  return (
    <View>
      {largeScreen ? <Sidebar clientApplication={clientApplication} /> : null}
      <View.Content>
        <Container paddingY={12} paddingX={[4, 4, 6, 8]} maxWidth="750px">
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
                <Welcome clientApplication={clientApplication} />
              </Route>
            </Switch>
          </AnimatePresence>
        </Container>
      </View.Content>
    </View>
  );
}
