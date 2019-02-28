import * as React from "react";
import Text from "../../../components/Text";
import Heading from "../../../components/Heading";
import Padding from "../../../components/Spacing/Padding";
import Invitation from "./Invitation";
import { InvitationsWrapper, Invitations } from "./styles";

const ApplicationInvitations = () => {
  return (
    <React.Fragment>
      <Padding bottom="xs">
        <Heading>Application Invitations</Heading>
      </Padding>
      <Text size="s">
        We have found some projects we think you might be interested in.
      </Text>
      <InvitationsWrapper>
        <Invitations>
          <Invitation
            application={{
              id: "1",
              project: {
                id: "2",
                description:
                  "The client is a company run by Hank Scorpio. Disguised as a friendly and innocent high-tech company, Globex is actually a front for an evil organization that Hank Scorpio uses to take over the East Coast of America.",
                primarySkill: "Facebook Marketing",
                estimatedBudget: "$1,000 - $1,500 per month"
              }
            }}
          />
          <Invitation
            application={{
              id: "1",
              project: {
                id: "2",
                description:
                  "The client is a company run by Hank Scorpio. Disguised as a friendly and innocent high-tech company.",
                primarySkill: "User Experience Design",
                estimatedBudget: "$1,000 - $1,500 per month"
              }
            }}
          />
          <Invitation
            application={{
              id: "1",
              project: {
                id: "2",
                description:
                  "The client is a company run by Hank Scorpio. Disguised as a friendly and innocent high-tech company.",
                primarySkill: "User Experience Design",
                estimatedBudget: "$1,000 - $1,500 per month"
              }
            }}
          />
        </Invitations>
      </InvitationsWrapper>
    </React.Fragment>
  );
};

export default ApplicationInvitations;
