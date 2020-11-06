import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderComponent, mockData, mockViewer } from "test-utils";
import AccountConfirmationPrompt from "./";
import { RESEND_CONFIRMATION_EMAIL } from "./queries";

test("Can resend confirmation email", async () => {
  const user = mockData.user({ confirmed: false });

  renderComponent(<AccountConfirmationPrompt />, {
    graphQLMocks: [
      mockViewer(user),
      {
        request: {
          query: RESEND_CONFIRMATION_EMAIL,
        },
        result: {
          data: {
            resendConfirmationEmail: {
              __typename: "ResendConfirmationEmailPayload",
              viewer: user,
            },
          },
        },
      },
    ],
  });

  const resend = await screen.findByText(/resend confirmation email/i);
  userEvent.click(resend);
  await screen.findByText(/confirmation email has been resent/i);
});
