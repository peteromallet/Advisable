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
import {
  useCaseStudySearchFormDetails,
  useCreateOrEditSearch,
} from "../queries";

export default function CreateOrEditSearch() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const largeScreen = useBreakpoint("lUp");
  const formData = useCreateOrEditSearch();
  const { data, loading, error } = useCaseStudySearchFormDetails({
    skip: !id,
    variables: { id },
  });

  const isLoading = loading || formData.loading;
  if (isLoading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;
  if (error) return <>Something went wrong, please refresh the page</>;

  const forwards = history.action === "PUSH";
  const caseStudySearch = data?.caseStudySearch;

  // Fix animation glitch on create case study search
  let animationLocation = location;
  if (location.pathname.includes("skills")) {
    animationLocation = { ...location, pathname: "/explore/new" };
  }

  return (
    <Box px={4}>
      <AnimatePresence
        initial={false}
        custom={{ largeScreen, forwards }}
        exitBeforeEnter
      >
        <Switch location={animationLocation} key={animationLocation.pathname}>
          <Route path="/explore/new">
            <CreateSearch
              skills={formData?.data?.skills}
              popularSkills={formData?.data?.popularCaseStudySkills}
            />
          </Route>
          <Route path="/explore/:id/skills">
            <EditSkills
              skills={formData?.data?.skills}
              popularSkills={formData?.data?.popularCaseStudySkills}
              caseStudySearch={caseStudySearch}
            />
          </Route>
          <Route path="/explore/:id/goals">
            <EditGoals caseStudySearch={caseStudySearch} />
          </Route>
          <Route path="/explore/:id/preferences">
            <EditPreferences
              currentCompany={formData?.data?.currentCompany}
              caseStudySearch={caseStudySearch}
            />
          </Route>
        </Switch>
      </AnimatePresence>
    </Box>
  );
}
