import { useState } from "react";
import { get } from "lodash-es";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Text, Link } from "@advisable/donut";
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
  const [resent, setResent] = useState(false);
  const [resendConfirmationEmail] = useMutation(RESEND);

  const resend = (e) => {
    e.preventDefault();
    setResent(true);
    resendConfirmationEmail();
    notifications.notify("Confirmation email has been resent");
  };

  return (
    <>
      <Text
        mb="s"
        as="h2"
        size="32px"
        lineHeight="34px"
        weight="semibold"
        color="blue900"
        letterSpacing="-0.02em"
      >
        Confirm your account
      </Text>
      <Text size="s" color="neutral700" lineHeight="m">
        Please click the confirmation link in the email that we have sent to{" "}
        <Text as="span" color="neutral900" fontWeight="medium">
          {get(viewer, "email")}
        </Text>
        . If you do not receive the confirmation message within a few minutes
        please check your spam folder.
      </Text>
      {!resent && (
        <>
          <Text
            fontSize="s"
            fontWeight="medium"
            color="neutral900"
            mt="l"
            mb="xs"
          >
            Didn&apos;t receive an email?
          </Text>
          <Link.External fontSize="s" href="#" onClick={resend}>
            Resend confirmation email
          </Link.External>
        </>
      )}
    </>
  );
};

export default ConfirmationPending;
