import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { Box } from "@advisable/donut";
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
  const formData = useCreateOrEditSearch();
  const { data, loading, error } = useCaseStudySearchFormDetails({
    skip: !id,
    variables: { id },
  });

  const isLoading = loading || formData.loading;
  if (isLoading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;
  if (error) return <>Something went wrong, please refresh the page</>;

  const caseStudySearch = data?.caseStudySearch;

  return (
    <Box px={4}>
      <Switch>
        <Route path="/explore/new">
          <CreateSearch
            skills={formData?.data?.caseStudySkills}
            popularSkills={formData?.data?.popularCaseStudySkills}
          />
        </Route>
        <Route path="/explore/:id/skills">
          <EditSkills
            skills={formData?.data?.caseStudySkills}
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
    </Box>
  );
}