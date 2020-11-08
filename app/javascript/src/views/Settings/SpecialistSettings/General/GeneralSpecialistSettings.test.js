import { fireEvent } from "@testing-library/react";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "src/testHelpers/apolloMocks";
import { renderRoute, mockData } from "src/testHelpers/test-utils";
import { GET_DATA, UPDATE_PROFILE } from "./queries";

const specialist = mockData.specialist({ name: "John Doe" });

test("update specialist's general settings", async () => {
  const skill = mockData.skill();
  const specialistSkill = mockData.specialistSkill();
  const skills = [
    { __typename: "Skill", value: skill.name, label: skill.name },
  ];
  const updatedSpecialist = mockData.specialist({
    remote: true,
    hourlyRate: 10000,
    publicUse: true,
    skills: [specialistSkill],
  });
  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(GET_DATA, {}, { skills, viewer: specialist }),
    mockMutation(
      UPDATE_PROFILE,
      {
        remote: true,
        hourlyRate: 10000,
        publicUse: true,
        skills: ["Skill"],
      },
      {
        updateProfile: {
          __typename: "UpdateProfilePayload",
          specialist: updatedSpecialist,
        },
      },
    ),
  ];
  const app = renderRoute({
    route: `/settings/general`,
    graphQLMocks,
  });
  await app.findByText(/general settings/i);
  const skillsInput = await app.findByPlaceholderText("e.g Online Marketing");
  fireEvent.click(skillsInput);
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  fireEvent.click(app.getByText("Yes, I’m happy to work remote"));
  fireEvent.change(app.getByPlaceholderText(/hourly rate/i), {
    target: { value: "100" },
  });
  fireEvent.click(app.getByText(/using my profile/i));
  fireEvent.click(app.getByLabelText(/save changes/i));
  await app.findByText(/has been updated/i);
});
