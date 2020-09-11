import React from "react";
import { useMutation } from "@apollo/client";
import { Box, Card, Text, Link } from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import RESEND_CONFIRMATION_EMAIL from "./resendConfirmationEmail";

function PendingConfirmation() {
  const notifications = useNotifications();
  const [resend, { data }] = useMutation(RESEND_CONFIRMATION_EMAIL);

  const handleResend = (e) => {
    e.preventDefault();
    notifications.notify("Confirmation email has been resent");
    resend();
  };

  return (
    <Box py="xxl" textAlign="center">
      <Card maxWidth={500} mx="auto" padding="xl">
        <Text
          mb="xs"
          fontSize="24px"
          color="blue900"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          Please confirm your account
        </Text>
        <Text mb="l" color="neutral800" lineHeight="s">
          Please check your inbox for a confirmation email to verify your
          account.
        </Text>
        <Text mb="l" fontSize="s" color="neutral800" lineHeight="s">
          If you do not receive the confirmation message within a few minutes of
          signing up, please check your Spam folder.
        </Text>

        {!data && (
          <>
            <Text fontSize="s" mb="xxs" fontWeight="medium">
              Didn't receive an email?
            </Text>
            <Link.External fontSize="s" href="#" onClick={handleResend}>
              Resend confirmation email
            </Link.External>
          </>
        )}
      </Card>
    </Box>
  );
}

export default PendingConfirmation;
