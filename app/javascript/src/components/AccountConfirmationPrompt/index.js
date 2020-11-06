import React from "react";
import { useMutation } from "@apollo/client";
import { ShieldCheckmark } from "@styled-icons/ionicons-outline";
import { Text, Link, Paragraph, Box, Circle } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import { RESEND_CONFIRMATION_EMAIL } from "./queries";

export default function AccountConfirmationPrompt() {
  const viewer = useViewer();
  const notifications = useNotifications();
  const [resend, { data }] = useMutation(RESEND_CONFIRMATION_EMAIL);

  if (viewer.confirmed) return null;

  function handleResend(e) {
    e.preventDefault();
    notifications.notify("Confirmation email has been resent");
    resend();
  }

  return (
    <Box bg="neutral100" borderRadius="12px" padding="lg" marginBottom="xl">
      <Box display="flex" alignItems="center">
        <Box flexShrink="0">
          <Circle size="40px" bg="cyan300" color="cyan900">
            <ShieldCheckmark width="24px" />
          </Circle>
        </Box>
        <Box paddingLeft="md">
          <Text fontSize="lg" fontWeight="medium" paddingBottom="2xs">
            Please confirm your account
          </Text>
          <Paragraph lineHeight="18px" color="neutral700">
            You have not confirmed your account yet. Please click the
            confirmation link inside of the email we have sent to{" "}
            <Text as="span" color="neutral900">
              {viewer.email}
            </Text>
            .
          </Paragraph>
        </Box>
      </Box>
      {!data ? (
        <>
          <Box height="1px" bg="neutral200" marginY="lg" />
          <Text fontSize="sm">
            Didnt receive an email?{" "}
            <Link.External
              href="#"
              variant="dark"
              fontSize="sm"
              onClick={handleResend}
            >
              Resend confirmation email
            </Link.External>
          </Text>
        </>
      ) : null}
    </Box>
  );
}
