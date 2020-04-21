import * as React from "react";
import { filter } from "lodash-es";
import { Box, Text } from "@advisable/donut";
import Invitation from "./Invitation";
import Loading from "./Loading";
import { InvitationsWrapper, Invitations } from "./styles";

const ApplicationInvitations = (props) => {
  if (props.loading) return <Loading />;

  // We filter the application recrods by status so that if the status
  // is updated in the graphql cache elsewhere in the app, this view will
  // automaticcaly be updated.
  let filtered = filter(props.applications, { status: "Invited To Apply" });

  if (!props.loading && filtered.length === 0) return null;

  return (
    <Box mb="l">
      <Box maxWidth={550}>
        <Text
          mb="xs"
          size="xxl"
          lineHeight="xxl"
          color="neutral.9"
          weight="semibold"
        >
          Good news! We found a project that might be suitable for you.
        </Text>
      </Box>
      <Box maxWidth={650} mb="xs">
        <Text color="neutral.7" lineHeight="m">
          {props.onHold
            ? "We have found a project we think you might be interested in. Please apply below to get accepted to Advisable and get priority access to projects."
            : "We have found a project we think you might be interested in."}
        </Text>
      </Box>
      <InvitationsWrapper>
        <Invitations>
          {filtered.map((application) => (
            <Invitation
              key={application.id}
              application={application}
              onViewInvitation={props.onViewInvitation}
            />
          ))}
        </Invitations>
      </InvitationsWrapper>
    </Box>
  );
};

export default ApplicationInvitations;
