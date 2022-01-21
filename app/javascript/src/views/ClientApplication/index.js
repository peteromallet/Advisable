import React from "react";
import { useQuery } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Container, useBreakpoint } from "@advisable/donut";
import GenericError from "src/views/GenericError";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import View from "src/components/View";
import Loading from "src/components/Loading";
import Navigation from "./components/Navigation";
import { CLIENT_APPLICATION_DATA } from "./queries";
// Steps
import CompanyOverview from "./steps/CompanyOverview";
import CompanyStage from "./steps/CompanyStage";
import Goals from "./steps/Goals";
import Requirements from "./steps/Requirements";
import Welcome from "./steps/Welcome";

export default function ClientApplication() {
  const { notify } = useNotifications();
  const location = useLocation();
  const viewer = useViewer();
  const navigate = useNavigate();
  const forwards = history.action === "PUSH";
  const largeScreen = useBreakpoint("lUp");

  if (viewer.isSpecialist) {
    notify("You already registered as a freelancer");
    navigate("/");
  }

  const { data, loading, error } = useQuery(CLIENT_APPLICATION_DATA);
  if (loading && !data) return <Loading />;
  if (error) return <GenericError />;
  const { clientApplication, industries } = data;

  return (
    <View>
      {largeScreen ? (
        <View.Sidebar>
          <Navigation clientApplication={clientApplication} />
        </View.Sidebar>
      ) : null}
      <View.Content>
        <Container paddingY={12} paddingX={[4, 4, 6, 8]} maxWidth="750px">
          <AnimatePresence
            initial={false}
            custom={{ largeScreen, forwards }}
            exitBeforeEnter
          >
            <Routes location={location} key={location.pathname}>
              <Route
                path="company-overview"
                element={
                  <CompanyOverview
                    clientApplication={clientApplication}
                    industries={industries}
                  />
                }
              />
              <Route
                path="company-stage"
                element={<CompanyStage clientApplication={clientApplication} />}
              />
              <Route
                path="goals"
                element={<Goals clientApplication={clientApplication} />}
              />
              <Route
                path="requirements"
                element={<Requirements clientApplication={clientApplication} />}
              />
              <Route
                path="*"
                element={<Welcome clientApplication={clientApplication} />}
              />
            </Routes>
          </AnimatePresence>
        </Container>
      </View.Content>
    </View>
  );
}
