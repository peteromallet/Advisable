import React from "react";
import Sticky from "components/Sticky";
import { Helmet } from "react-helmet";
import { Box, Avatar, useBreakpoint } from "@advisable/donut";
import { Switch, Route, useParams } from "react-router-dom";
import Loading from "components/Loading";
import MatchMetaInfo from "./MatchMetaInfo";
import Proposal from "./Proposal";
import ApplicationDetails from "./ApplicationDetails";
import { useCandidate } from "./queries";
import ActionBar from "./ActionBar";
import ActionBarContainer from "./ActionBarContainer";
import ApplicantScore from "./ApplicantScore";
import ApplicationStatus from "./ApplicationStatus";

export default function CandidateDetails({ project }) {
  const { applicationId } = useParams();
  const isLargeScreen = useBreakpoint("mUp");
  const { loading, data } = useCandidate({ variables: { id: applicationId } });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />;

  const application = data?.application;

  return (
    <Box paddingTop="40px" display={[null, null, "flex"]}>
      <Helmet>
        <title>Advisable | {application.specialist.name}</title>
      </Helmet>
      <Box
        flexShrink="0"
        marginBottom="xl"
        width={["100%", "100%", "240px"]}
        marginRight={[null, null, "64px"]}
      >
        <Sticky offset={40} enabled={isLargeScreen}>
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
          <Box paddingTop="12px">
            <ApplicationStatus application={application} />
          </Box>
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
