import React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { Text, Button } from "@advisable/donut";
import useViewer from "../../../hooks/useViewer";
import { useNotifications } from "../../../components/Notifications";

const RESEND = gql`
  mutation ResendConfirmationEmail {
    resendConfirmationEmail {
      user {
        id
      }
      errors {
        code
      }
    }
  }
`;

// Renders the freelancer signup flow.
const ConfirmationPending = () => {
  const viewer = useViewer();
  const notifications = useNotifications();
  const [resent, setResent] = React.useState(false);
  const [resendConfirmationEmail] = useMutation(RESEND);

  const resend = () => {
    setResent(true);
    resendConfirmationEmail();
    notifications.notify("Confirmation email has been resent");
  };

  return (
    <>
      <Text as="h2" size="xxxl" weight="semibold" color="neutral.9" mb="s">
        Confirm your account
      </Text>
      <Text size="s" color="neutral.7" lineHeight="m">
        Please click the confirmation link in the email that we have sent to{" "}
        <Text as="span" color="blue.7" weight="medium">
          {viewer.email}
        </Text>
        . If you do not receive the confirmation message within a few minutes
        please check your spam folder.
      </Text>
      {!resent && (
        <>
          <Text size="s" color="neutral.4" mt="l">
            Didn't receive an email?
          </Text>
          <Button intent="success" onClick={resend} appearance="minimal">
            Resend confirmation email
          </Button>
        </>
      )}
    </>
  );
};

export default ConfirmationPending;
