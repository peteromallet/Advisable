import { graphql } from "react-apollo";
import Text from "src/components/Text";
import React, { Fragment, useState } from "react";
import { withNotifications } from "src/components/Notifications";
import { Card, Button } from "./styles";
import RESEND_CONFIRMATION_EMAIL from "./resendConfirmationEmail.graphql";

const PendingConfirmation = ({ mutate, notifications }) => {
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResent(true);
    notifications.notify("Confirmation email has been resent");
    mutate()
  };

  return (
    <Card>
      <Text marginBottom="xs" weight="bold" center>
        Please confirm your account
      </Text>
      <Text marginBottom="xl" center>
        Please check your inbox for a confirmation email to verify your account
      </Text>

      {!resent && (
        <Fragment>
          <Text size="s" center>
            Didn't receive an email?
          </Text>
          <Button onClick={handleResend}>Resend confirmation email</Button>
        </Fragment>
      )}
    </Card>
  );
};

export default graphql(RESEND_CONFIRMATION_EMAIL)(
  withNotifications(PendingConfirmation)
);
