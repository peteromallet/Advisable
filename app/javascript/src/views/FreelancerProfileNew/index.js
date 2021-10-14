import React from "react";
import { Switch, Route } from "react-router";
import { Box, useBackground } from "@advisable/donut";
import Loading from "src/components/Loading";
import NotFound, { isNotFound } from "src/views/NotFound";
import Article from "./views/Article";
import Profile from "./views/Profile";
import { useProfileData } from "./queries";
import ErrorBoundary from "src/components/ErrorBoundary";

export default function FreelancerProfile() {
  const { loading, data, error } = useProfileData();
  useBackground("white");

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  return (
    <ErrorBoundary>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={{ _: "center", l: "stretch" }}
        width={{ l: "1024px", xl: "1136px" }}
        mx="auto"
        pb={20}
        pt={[3, 5, 5, 5, 7]}
      >
        <Switch>
          <Route path="/freelancers/:id/case_studies/:case_study_id">
            <Article profileData={data} />
          </Route>
          <Route>
            <Profile data={data} />
          </Route>
        </Switch>
      </Box>
    </ErrorBoundary>
  );
}
