import user from "@testing-library/user-event";
import { fireEvent, screen } from "@testing-library/react";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "src/testHelpers/apolloMocks";
import { renderRoute, mockData } from "src/testHelpers/test-utils";
import { GET_DATA, UPDATE_PROFILE } from "./queries";

const specialist = mockData.specialist({
  name: "John Doe",
  firstName: "John",
  lastName: "Doe",
  email: "staging+dwight@advisable.com",
});

test("update specialist's general settings", async () => {
  const newEmail = "staging+dwight_new@advisable.com";

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(GET_DATA, {}, { viewer: specialist }),
    mockMutation(
      UPDATE_PROFILE,
      {
        firstName: "Angela",
        lastName: "Noelle",
        email: newEmail,
        remote: true,
        hourlyRate: 10000,
        publicUse: true,
      },
      {
        updateProfile: {
          __typename: "UpdateProfilePayload",
          specialist: {
            ...specialist,
            remote: true,
            hourlyRate: 10000,
            publicUse: true,
            email: newEmail,
            firstName: "Angela",
            lastName: "Noelle",
          },
        },
      },
    ),
  ];
  const app = renderRoute({ route: `/settings/general`, graphQLMocks });
  await app.findByText(/general settings/i);
  fireEvent.click(app.getByText("Yes, I’m happy to work remote"));
  const email = await screen.findByLabelText(/Email/i);
  user.clear(email);
  user.type(email, newEmail);
  const firstName = await screen.findByLabelText(/First Name/i);
  user.clear(firstName);
  user.type(firstName, "Angela");
  const lastName = await screen.findByLabelText(/Last Name/i);
  user.clear(lastName);
  user.type(lastName, "Noelle");
  fireEvent.change(app.getByPlaceholderText(/hourly rate/i), {
    target: { value: "100" },
  });
  fireEvent.click(app.getByText(/using my profile/i));
  fireEvent.click(app.getByLabelText(/save changes/i));
  await app.findByText(/has been updated/i);
});
