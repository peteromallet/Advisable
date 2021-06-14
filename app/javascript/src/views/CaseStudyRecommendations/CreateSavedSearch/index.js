import React from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router";
import { AnimatePresence } from "framer-motion";
import { Box, Container, useBreakpoint } from "@advisable/donut";
import Loading from "src/components/Loading";
import Sidebar from "./components/Sidebar";
import NotFound from "src/views/NotFound";
// Steps
import Skills from "./steps/Skills";
import Goals from "./steps/Goals";
import Preferences from "./steps/Preferences";
import Review from "./steps/Review";
import { useSavedSearch } from "./useSavedSearch";

export default function CreateSavedSearch() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const largeScreen = useBreakpoint("lUp");
  const forwards = history.action === "PUSH";
  const { data, loading, error } = useSavedSearch(id);

  if (loading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <div>
      {largeScreen ? <Sidebar id={id} /> : null}
      <Box paddingLeft={{ l: "300px" }}>
        <Container paddingY={10} paddingX={[4, 4, 6, 8]} maxWidth="750px">
          <AnimatePresence
            initial={false}
            custom={{ largeScreen, forwards }}
            exitBeforeEnter
          >
            <Switch location={location} key={location.pathname}>
              <Route path={["/explore/new", "/explore/new/:id/skills"]} exact>
                <Skills
                  caseStudySearch={data.caseStudySearch}
                  skills={data.skills}
                />
              </Route>
              <Route path="/explore/new/:id/goals">
                <Goals caseStudySearch={data.caseStudySearch} />
              </Route>
              <Route path="/explore/new/:id/preferences">
                <Preferences caseStudySearch={data.caseStudySearch} />
              </Route>
              <Route path="/explore/new/:id/review">
                <Review caseStudySearch={data.caseStudySearch} />
              </Route>
            </Switch>
          </AnimatePresence>
        </Container>
      </Box>
    </div>
  );
}
