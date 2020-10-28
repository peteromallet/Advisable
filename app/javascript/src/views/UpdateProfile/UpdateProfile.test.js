import user from "@testing-library/user-event";
import { fireEvent, screen } from "@testing-library/react";
import {
  renderRoute,
  mockViewer,
  mockQuery,
  mockMutation,
  mockData,
} from "test-utils";
import GET_PROFILE from "./fetchProfile.graphql";
import { GET_DATA, UPDATE_PROFILE } from "./Profile/queries";

test("User can update their profile", async () => {
  const design = mockData.skill({ name: "Design" });
  const development = mockData.skill({ name: "Development" });

  const specialist = mockData.specialist({
    email: "staging+dwight@advisable.com",
    bio: "",
    skills: [],
    hourlyRate: 50,
    publicUse: true,
    country: mockData.country(),
  });

  const newEmail = "staging+dwight_new@advisable.com"
  const newBio = "This is my bio";

  renderRoute({
    route: "/profile",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        GET_DATA,
        {},
        {
          skills: [
            { ...design, value: design.name, label: design.name },
            {
              ...development,
              value: development.name,
              label: development.name,
            },
          ],
          viewer: specialist,
        },
      ),
      mockQuery(
        GET_PROFILE,
        {},
        {
          viewer: specialist,
        },
      ),
      mockMutation(
        UPDATE_PROFILE,
        {
          email: newEmail,
          bio: newBio,
          hourlyRate: 10000,
          publicUse: true,
          skills: [design.name, development.name],
        },
        {
          updateProfile: {
            __typename: "UpdateProfilePayload",
            specialist: {
              ...specialist,
              email: newEmail,
              bio: newBio,
              skills: [design, development],
              hourlyRate: 100,
            },
          },
        },
      ),
    ],
  });

  const bio = await screen.findByLabelText(/about me/i);
  user.type(bio, newBio);
  const email = await screen.findByLabelText(/Email/i)
  user.clear(email)
  user.type(email, newEmail)
  const rate = screen.getByLabelText(/hourly rate/i);
  fireEvent.change(rate, { target: { value: "100" } });
  const skills = screen.getByPlaceholderText(/online marketing/i);
  fireEvent.click(skills);
  fireEvent.keyDown(skills, { key: "ArrowDown" });
  fireEvent.keyDown(skills, { key: "Enter" });
  fireEvent.keyDown(skills, { key: "ArrowDown" });
  fireEvent.keyDown(skills, { key: "Enter" });
  user.click(screen.getByLabelText(/save changes/i));
  await screen.findByText(/profile has been updated/i);
});
