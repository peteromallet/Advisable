import React from "react";
import { useMutation } from "@apollo/client";
import { Text, Link } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import { useNotifications } from "src/components/Notifications";
import { RESEND_CONFIRMATION_EMAIL } from "./queries";

export default function AccountConfirmationPrompt() {
  const viewer = useViewer();
  const notifications = useNotifications();
  const [resend, { data }] = useMutation(RESEND_CONFIRMATION_EMAIL);

  if (viewer?.confirmed || (viewer?.isSpecialist && !viewer?.isAccepted))
    return null;

  async function handleResend(e) {
    e.preventDefault();
    const { errors } = await resend();
    if (errors) {
      notifications.notify("Something went wrong, please try again", {
        variant: "error",
      });
    } else {
      notifications.notify("Confirmation email has been resent");
    }
  }

  return (
    <div className="rounded-[32px] bg-neutral100 p-6 md:p-6">
      <p className="text-lg font-medium leading-none mb-1">
        Please confirm your account
      </p>
      <p className="text-neutral900">
        Please click the confirmation link inside of the email we have sent to{" "}
        <Text as="span" color="neutral900">
          {viewer.email}
        </Text>
        .
      </p>
      {!data?.resendConfirmationEmail ? (
        <p className="text-sm pt-2 mt-3 border-t border-solid border-neutral200">
          Haven’t received an email?{" "}
          <Link.External
            href="#"
            variant="dark"
            fontSize="sm"
            onClick={handleResend}
          >
            Resend confirmation email
          </Link.External>
        </p>
      ) : null}
    </div>
  );
}
