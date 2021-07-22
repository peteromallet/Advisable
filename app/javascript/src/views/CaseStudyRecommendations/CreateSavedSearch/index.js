import React from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router";
import { Redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Container, useBreakpoint } from "@advisable/donut";
import Loading from "src/components/Loading";
import NotFound from "src/views/NotFound";
// Steps
import Skills from "./steps/Skills";
import Goals from "./steps/Goals";
import Preferences from "./steps/Preferences";
// Queries
import { useSavedSearch } from "./queries/useSavedSearch";
// Validation schemas
import { validationSchema as skillsValidationSchema } from "./steps/Skills";
import { validationSchema as goalsValidationSchema } from "./steps/Goals";

const useSavedSearchParams = () => {
  const location = useLocation();
  const { id, step } = useParams();
  return { id: id || location.state?.id, step };
};

export default function CreateSavedSearch() {
  const { id, step } = useSavedSearchParams();
  const location = useLocation();
  const history = useHistory();
  const largeScreen = useBreakpoint("lUp");
  const forwards = history.action === "PUSH";
  const { data, loading, error } = useSavedSearch(id);

  if (loading) return <Loading />;
  if (error) return <NotFound />;

  // Detect the last step where user dropped off
  if (step === "continue") {
    const skillsComplete = skillsValidationSchema.isValidSync(
      data.caseStudySearch,
    );
    const goalsComplete = goalsValidationSchema.isValidSync(
      data.caseStudySearch,
    );

    let lastStep;
    if (!skillsComplete) lastStep = "skills";
    if (skillsComplete && !goalsComplete) lastStep = "goals";
    if (goalsComplete) lastStep = "preferences";

    return <Redirect to={`/explore/${id}/${lastStep}`} />;
  }

  return (
    <Container paddingY={10} paddingX={[4, 4, 6, 8]} maxWidth="750px">
      <AnimatePresence
        initial={false}
        custom={{ largeScreen, forwards }}
        exitBeforeEnter
      >
        <Switch location={location} key={location.pathname}>
          <Route path={["/explore/new", "/explore/:id/skills"]} exact>
            <Skills
              caseStudySearch={data.caseStudySearch}
              popularSkills={data.popularCaseStudySkills}
              skills={data.skills}
            />
          </Route>
          <Route path="/explore/:id/goals">
            <Goals caseStudySearch={data.caseStudySearch} />
          </Route>
          <Route path="/explore/:id/preferences">
            <Preferences
              id={data.caseStudySearch?.id}
              clientApplication={data.clientApplication}
            />
          </Route>
        </Switch>
      </AnimatePresence>
    </Container>
  );
}
