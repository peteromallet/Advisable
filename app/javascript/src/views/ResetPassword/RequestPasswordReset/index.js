import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Text, Box, Card, Button } from "@advisable/donut";
import Logo from "src/components/Logo";
import RequestResetForm from "./RequestResetForm";

// The constants below define the various stages or states of the request
// password reset flow.
// the main request form
const REQUEST = "REQUEST";
// When the password reset has been sent
const SENT = "SENT";
// If there is no account matching the email
const NO_ACCOUNT = "NO_ACCOUNT";
// if the found account has not created an account yet. i.e they haven't
// finished the freelancer application process.
const APPLICATION_IN_PROCESS = "APPLICATION_IN_PROCESS";

function RequestPasswordReset() {
  const history = useHistory();
  const [status, setStatus] = useState("REQUEST");

  const handleRequest = ({ data, errors }) => {
    if (errors) {
      let error = errors[0]?.extensions?.code;

      if (error === "ACCOUNT_NOT_FOUND") {
        setStatus(NO_ACCOUNT);
      }
    }

    if (data.requestPasswordReset.sent) {
      setStatus(SENT);
    }
  };

  return (
    <Box maxWidth={460} mx="auto" py={12}>
      <Box textAlign="center" mb={8}>
        <Logo />
      </Box>
      <Card padding="xl">
        {status === SENT && (
          <>
            <Text
              textAlign="center"
              fontSize="28px"
              color="blue900"
              fontWeight="medium"
              letterSpacing="-0.03em"
              marginBottom="l"
            >
              Instructions sent!
            </Text>
            <Text center>
              Instructions for resetting your password have been sent to your
              email.
            </Text>
          </>
        )}

        {status === NO_ACCOUNT && (
          <>
            <Text
              mb="xs"
              as="h3"
              color="blue900"
              fontSize="xxl"
              textAlign="center"
              fontWeight="semibold"
              letterSpacing="-0.03em"
            >
              Account Not Found
            </Text>
            <Text textAlign="center" color="neutral800" mb="l" lineHeight="s">
              We couldn&apos;t find an account for the email you provided.
            </Text>
            <Button
              mb="xs"
              size="l"
              css="width: 100%;"
              variant="subtle"
              onClick={() => {
                history.push("/clients/signup");
              }}
            >
              Apply to be a client
            </Button>
            <Button
              size="l"
              css="width: 100%;"
              variant="subtle"
              onClick={() => {
                history.push("/freelancers/signup");
              }}
            >
              Apply to be a specialist
            </Button>
          </>
        )}

        {status === APPLICATION_IN_PROCESS && (
          <>
            <Text textAlign="center" fontSize="xl" marginBottom="l">
              Application not complete
            </Text>
            <Text center>
              It looks like you haven&apos;t finished your Advisable
              application. We&apos;ve sent you an email with details on how to
              continue your application.
            </Text>
          </>
        )}

        {status === REQUEST && <RequestResetForm onSubmit={handleRequest} />}
      </Card>
    </Box>
  );
}

export default RequestPasswordReset;
