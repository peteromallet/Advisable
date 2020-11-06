// Renders the freelancers applications view.
import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Box, Notice } from "@advisable/donut";
import { useQuery } from "@apollo/client";
import { RefreshCcw } from "@styled-icons/feather";
import Loading from "../../components/Loading";
import { GET_APPLICATIONS } from "./queries";
import Empty from "./Empty";
import AccountOnHold from "./AccountOnHold";
import OpenApplications from "./OpenApplications";
import ApplicationInvitations from "./ApplicationInvitations";
import AccountConfirmationPrompt from "components/AccountConfirmationPrompt";

const Applications = () => {
  const history = useHistory();
  const { loading, data } = useQuery(GET_APPLICATIONS);

  if (loading) return <Loading />;

  const viewer = data.viewer;
  const onHold = viewer.applicationStage === "On Hold";
  const fullApplicationPending = viewer.applicationStage === "Full Application";

  const invitations = viewer.applications.filter(
    (a) => a.status === "Invited To Apply",
  );
  const applications = viewer.applications.filter(
    (a) => a.status !== "Invited To Apply",
  );

  const hasApplications = applications.length;
  const hasInvitations = invitations.length > 0;

  if (hasInvitations && (onHold || fullApplicationPending)) {
    return <Redirect to={`/invites/${invitations[0].id}`} />;
  }

  if (onHold && invitations.length === 0) {
    return <AccountOnHold />;
  }

  if (fullApplicationPending) {
    return <Redirect to="/apply" />;
  }

  const handleViewInvitation = (id) => {
    history.push(`/invites/${id}`);
  };

  return (
    <Box maxWidth="1000px" width="96%" marginX="auto" paddingY="3xl">
      <AccountConfirmationPrompt />
      {onHold && (
        <Box mb="l">
          <Notice
            mb="m"
            icon={<RefreshCcw />}
            title="Your account is currently on hold"
          >
            We evaluate and accept freelancers as they apply for projects.
          </Notice>
        </Box>
      )}
      <ApplicationInvitations
        onHold={onHold}
        loading={loading}
        onViewInvitation={handleViewInvitation}
        applications={loading ? [] : invitations}
      />
      {!loading && !hasApplications && !hasInvitations && <Empty />}
      <OpenApplications
        onHold={onHold}
        loading={loading}
        specialist={viewer}
        applications={loading ? [] : applications}
      />
    </Box>
  );
};

export default Applications;
