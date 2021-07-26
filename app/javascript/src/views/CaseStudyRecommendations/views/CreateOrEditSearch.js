import React from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Box, useBreakpoint } from "@advisable/donut";
import Loading from "src/components/Loading";
import NotFound, { isNotFound } from "src/views/NotFound";
import CreateSearch from "../views/CreateSearch";
import EditSkills from "../views/EditSkills";
import EditGoals from "../views/EditGoals";
import EditPreferences from "../views/EditPreferences";
import { useCaseStudySearch } from "../queries";

export default function CreateOrEditSearch() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const largeScreen = useBreakpoint("lUp");
  const { data, loading, error } = useCaseStudySearch({
    skip: !id,
    variables: { id },
  });
  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;
  if (error) return <>Something went wrong, please refresh the page</>;

  const forwards = history.action === "PUSH";
  const caseStudySearch = data?.caseStudySearch;

  return (
    <Box px={12}>
      <AnimatePresence
        initial={false}
        custom={{ largeScreen, forwards }}
        exitBeforeEnter
      >
        <Switch location={location} key={location.pathname}>
          <Route path="/explore/new">
            <CreateSearch />
          </Route>
          <Route path="/explore/:id/skills">
            <EditSkills caseStudySearch={caseStudySearch} />
          </Route>
          <Route path="/explore/:id/goals">
            <EditGoals caseStudySearch={caseStudySearch} />
          </Route>
          <Route path="/explore/:id/preferences">
            <EditPreferences caseStudySearch={caseStudySearch} />
          </Route>
        </Switch>
      </AnimatePresence>
    </Box>
  );
}
