import React from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Container, useBreakpoint } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import View from "src/components/View";
import Navigation from "./components/Navigation";
import Welcome from "./steps/Welcome";
import Introduction from "./steps/Introduction";
import Overview from "./steps/Overview";
import PreviousWork from "./steps/PreviousWork";
import WorkPreferences from "./steps/WorkPreferences";
import IdealProject from "./steps/IdealProject";
import Loading from "src/components/Loading";
import { useGetSpecialist } from "./queries";

export default function FreelancerApplication() {
  const location = useLocation();
  const viewer = useViewer();
  const navigate = useNavigate();
  const forwards = history.action === "PUSH";
  const largeScreen = useBreakpoint("lUp");

  if (viewer.isClient) {
    navigate("/");
  }

  const { data, loading } = useGetSpecialist(viewer.id);
  if (loading) return <Loading />;
  const { specialist, countries, skills, industries } = data;

  return (
    <View>
      {largeScreen ? (
        <View.Sidebar>
          <Navigation specialist={specialist} />
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
                path="introduction"
                element={
                  <Introduction specialist={specialist} countries={countries} />
                }
              />
              <Route
                path="overview"
                element={<Overview specialist={specialist} />}
              />
              <Route
                path="experience"
                element={<PreviousWork specialist={specialist} />}
              />
              <Route
                path="preferences"
                element={
                  <WorkPreferences
                    skills={skills}
                    industries={industries}
                    specialist={specialist}
                  />
                }
              />

              <Route
                path="ideal_project"
                element={<IdealProject specialist={specialist} />}
              />

              <Route path="*" element={<Welcome specialist={specialist} />} />
            </Routes>
          </AnimatePresence>
        </Container>
      </View.Content>
    </View>
  );
}
