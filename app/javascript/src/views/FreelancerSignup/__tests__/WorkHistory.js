import { fireEvent } from "@testing-library/react";
import {
  renderRoute,
  mockViewer,
  mockQuery,
  mockMutation,
  mockData,
} from "test-utils";
import GET_SPECIALIST from "../getProfile";
import UPDATE_PROFILE from "../updateProfile";
import COMPLETE_SETUP from "../completeSetup";
import { GET_APPLICATIONS } from "../../Applications/queries";
import { GET_SIMILAR_PROJECTS } from "../../Applications/SimilarProjects/queries";

test("Completes the setup", async () => {
  const viewer = mockData.specialist({
    applicationStage: "Started",
    invitations: [],
  });

  const { findByText, getByLabelText } = renderRoute({
    route: `/freelancers/signup/work`,
    graphQLMocks: [
      mockViewer(viewer),
      mockQuery(GET_SPECIALIST, {}, { viewer }),
      mockMutation(
        UPDATE_PROFILE,
        {
          linkedin: "https://linkedin.com",
          website: "",
          resume: null,
        },
        {
          updateProfile: {
            __typename: "UpdateProfilePayload",
            specialist: viewer,
          },
        },
      ),
      mockMutation(
        COMPLETE_SETUP,
        {},
        {
          completeSetup: {
            __typename: "CompleteSetupPayload",
            specialist: {
              ...viewer,
              applicationStage: "On Hold",
            },
          },
        },
      ),
      mockQuery(
        GET_APPLICATIONS,
        {},
        {
          viewer: {
            ...viewer,
            applicationStage: "On Hold",
            applications: [],
          },
        },
      ),
      mockQuery(
        GET_SIMILAR_PROJECTS,
        {},
        {
          viewer: {
            ...viewer,
            similarPreviousProjects: [
              mockData.previousProject({
                title: "Example project",
                specialist: mockData.specialist(),
                skills: [],
              }),
            ],
          },
        },
      ),
    ],
  });

  await findByText("Work history");
  const linkedin = getByLabelText("Linkedin URL (Recommended)");
  fireEvent.change(linkedin, { target: { value: "https://linkedin.com" } });
  const button = getByLabelText("Complete Setup");
  fireEvent.click(button);
  await findByText(/account is currently on hold/i);
  await findByText(/example project/i);
});
