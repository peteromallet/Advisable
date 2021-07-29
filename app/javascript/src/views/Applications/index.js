// Renders the freelancers applications view.
import React from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@advisable/donut";
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading";
import { GET_APPLICATIONS } from "./queries";
import Empty from "./Empty";
import OpenApplications from "./OpenApplications";
import ApplicationInvitations from "./ApplicationInvitations";
import AccountConfirmationPrompt from "src/components/AccountConfirmationPrompt";
import FreelancerApplicationPrompt from "src/components/FreelancerApplicationPrompt";
import AcceptedStatusPrompt from "src/components/AcceptedStatusPrompt";

const Applications = () => {
  const history = useHistory();
  const { loading, data } = useQuery(GET_APPLICATIONS);

  if (loading) return <Loading />;

  const viewer = data.viewer;
  const isAccepted = viewer.applicationStage === "Accepted";
  const hasValidatedProjects = viewer.previousProjects?.nodes?.some(
    (proj) => proj.validationStatus === "Validated",
  );

  const invitations = viewer.applications.filter(
    (a) => a.status === "Invited To Apply",
  );
  const applications = viewer.applications.filter(
    (a) => a.status !== "Invited To Apply",
  );

  const hasApplications = applications.length;
  const hasInvitations = invitations.length > 0;

  const handleViewInvitation = (id) => {
    history.push(`/invites/${id}`);
  };

  return (
    <Box maxWidth="1000px" width="96%" marginX="auto" paddingY="3xl">
      {isAccepted && !hasValidatedProjects ? <AcceptedStatusPrompt /> : null}
      <FreelancerApplicationPrompt />
      <AccountConfirmationPrompt />
      <ApplicationInvitations
        loading={loading}
        onViewInvitation={handleViewInvitation}
        applications={loading ? [] : invitations}
      />
      {!loading && !hasApplications && !hasInvitations && isAccepted && (
        <Empty />
      )}
      <OpenApplications
        loading={loading}
        specialist={viewer}
        applications={loading ? [] : applications}
      />
    </Box>
  );
};

export default Applications;
