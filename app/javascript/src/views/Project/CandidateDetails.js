import React from "react";
import Sticky from "components/Sticky";
import { Helmet } from "react-helmet";
import { Box, Avatar } from "@advisable/donut";
import { Switch, Route, useParams } from "react-router-dom";
import MatchMetaInfo from "./MatchMetaInfo";
import Proposal from "./Proposal";
import ApplicationDetails from "./ApplicationDetails";
import { useCandidate } from "./queries";
import ActionBar from "./ActionBar";
import ActionBarContainer from "./ActionBarContainer";
import ApplicantScore from "./ApplicantScore";

export default function CandidateDetails({ project }) {
  const { applicationId } = useParams();
  const { loading, data } = useCandidate({ variables: { id: applicationId } });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <>loading...</>;

  const application = data?.application;

  return (
    <Box paddingTop="40px" display="flex">
      <Helmet>
        <title>Advisable | {application.specialist.name}</title>
      </Helmet>
      <Box width="220px" marginRight="64px" flexShrink="0">
        <Sticky offset={100}>
          <Avatar
            size="xxl"
            marginBottom="24px"
            url={application.specialist.avatar}
            name={application.specialist.name}
          >
            <Box position="absolute" right="-12px" top="-12px" zIndex="5">
              <ApplicantScore score={application.score} />
            </Box>
          </Avatar>
          <MatchMetaInfo match={application} />
        </Sticky>
      </Box>
      <Box flexGrow="1" minWidth={0} paddingBottom="140px">
        <ActionBarContainer>
          <Switch>
            <Route path="/projects/:id/candidates/:applicationId/proposal">
              <Proposal />
            </Route>
            <Route path="/projects/:id/candidates/:applicationId">
              <ApplicationDetails application={application} project={project} />
            </Route>
          </Switch>
          <ActionBar application={application} project={project} />
        </ActionBarContainer>
      </Box>
    </Box>
  );
}
