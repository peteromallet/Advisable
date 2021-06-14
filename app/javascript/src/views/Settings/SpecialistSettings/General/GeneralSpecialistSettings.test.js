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
  const skill = mockData.skill();
  const specialistSkill = mockData.specialistSkill({
    label: "Skill",
    value: "Skill",
  });
  const skills = [
    { __typename: "Skill", value: skill.name, label: skill.name },
  ];

  const newEmail = "staging+dwight_new@advisable.com";

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(GET_DATA, {}, { skills, viewer: specialist }),
    mockMutation(
      UPDATE_PROFILE,
      {
        firstName: "Angela",
        lastName: "Noelle",
        email: newEmail,
        remote: true,
        hourlyRate: 10000,
        publicUse: true,
        skills: ["Skill"],
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
            skills: [specialistSkill],
          },
        },
      },
    ),
  ];
  const app = renderRoute({
    route: `/settings/general`,
    graphQLMocks,
  });
  await app.findByText(/general settings/i);
  const skillsInput = screen.getByPlaceholderText("e.g Online Marketing");
  fireEvent.keyDown(skillsInput, { key: "ArrowDown", keyCode: 40 });
  fireEvent.keyDown(skillsInput, { key: "Return", keyCode: 13 });
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
