import * as React from "react";
import { filter } from "lodash";
import Text from "../../../components/Text";
import Heading from "../../../components/Heading";
import Padding from "../../../components/Spacing/Padding";
import Invitation from "./Invitation";
import Loading from "./Loading";
import { InvitationsWrapper, Invitations } from "./styles";
import { ApplicationType } from "../../../types";

interface Props {
  loading: boolean;
  applications: ApplicationType[];
  onViewInvitation: (id: string) => void;
}

const ApplicationInvitations = (props: Props) => {
  if (props.loading) return <Loading />;

  // We filter the application recrods by status so that if the status
  // is updated in the graphql cache elsewhere in the app, this view will
  // automaticcaly be updated.
  let filtered = filter(props.applications, { status: "Invited To Apply" })

  if (!props.loading && filtered.length === 0) return null;

  return (
    <Padding bottom="xl">
      <Padding bottom="xs">
        <Heading level={2}>Application Invitations</Heading>
      </Padding>
      <Text size="s">
        We have found some projects we think you might be interested in.
      </Text>
      <InvitationsWrapper>
        <Invitations>
          {filtered.map(application => (
            <Invitation
              key={application.id}
              application={application}
              onViewInvitation={props.onViewInvitation}
            />
          ))}
        </Invitations>
      </InvitationsWrapper>
    </Padding>
  );
};

export default ApplicationInvitations;
