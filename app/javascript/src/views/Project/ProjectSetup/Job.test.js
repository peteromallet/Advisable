import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  renderRoute,
  mockData,
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/test-utils";
import { GET_JOB, UPDATE_PROJECT, PUBLISH_PROJECT } from "./queries";

test("User can publish a job", async () => {
  const user = mockData.user({
    industry: mockData.industry({
      popularSkills: {
        __typename: "SkillsConnection",
        nodes: [
          mockData.skill({ name: "Linkedin Marketing" }),
          mockData.skill({ name: "Instagram Marketing" }),
        ],
      },
    }),
  });

  const project = mockData.project({
    user,
    salesPerson: mockData.salesPerson(),
    status: "DRAFT",
    goals: [],
    characteristics: [],
    optionalCharacteristics: [],
    requiredCharacteristics: [],
    likelyToHire: null,
    locationImportance: null,
    industryExperienceImportance: null,
    primarySkill: null,
    skills: [],
  });

  renderRoute({
    route: `/projects/${project.id}/setup`,
    graphQLMocks: [
      mockViewer(user),
      mockQuery(
        GET_JOB,
        { id: project.id },
        {
          skills: [
            mockData.skill({ name: "Facebook Marketing" }),
            mockData.skill({ name: "Twitter Marketing" }),
            mockData.skill({ name: "Linkedin Marketing" }),
            mockData.skill({ name: "Instagram Marketing" }),
          ],
          popularSkills: {
            __typename: "SkillsConnection",
            nodes: [
              mockData.skill({ name: "Facebook Marketing" }),
              mockData.skill({ name: "Twitter Marketing" }),
            ],
          },
          project,
        },
      ),
      mockMutation(
        UPDATE_PROJECT,
        {
          id: project.id,
          skills: ["Linkedin Marketing", "Facebook Marketing"],
        },
        () => {
          project.primarySkill = mockData.skill({ name: "Linked Marketing" });
          project.skills = [
            mockData.skill({ name: "Linkedin Marketing" }),
            mockData.skill({ name: "Facebook Marketing" }),
          ];

          return {
            updateProject: {
              __typename: "UpdateProjectPayload",
              project,
            },
          };
        },
      ),
      mockMutation(
        UPDATE_PROJECT,
        {
          id: project.id,
          primarySkill: "Facebook Marketing",
        },
        () => {
          project.primarySkill = mockData.skill({
            name: "Facebook Marketing ",
          });

          return {
            updateProject: {
              __typename: "UpdateProjectPayload",
              project,
            },
          };
        },
      ),
      mockMutation(
        UPDATE_PROJECT,
        {
          id: project.id,
          industryExperienceImportance: 2,
        },
        () => {
          project.industryExperienceImportance = 2;

          return {
            updateProject: {
              __typename: "UpdateProjectPayload",
              project,
            },
          };
        },
      ),
      mockMutation(
        UPDATE_PROJECT,
        {
          id: project.id,
          locationImportance: 2,
        },

        () => {
          project.locationImportance = 2;

          return {
            updateProject: {
              __typename: "UpdateProjectPayload",
              project,
            },
          };
        },
      ),
      mockMutation(
        UPDATE_PROJECT,
        {
          id: project.id,
          characteristics: ["One", "Two", "Three"],
        },

        () => {
          project.characteristics = ["One", "Two", "Three"];
          project.optionalCharacteristics = ["One", "Two", "Three"];

          return {
            updateProject: {
              __typename: "UpdateProjectPayload",
              project,
            },
          };
        },
      ),
      mockMutation(
        UPDATE_PROJECT,
        {
          id: project.id,
          requiredCharacteristics: ["One", "Two"],
        },

        () => {
          project.characteristics = ["One", "Two", "Three"];
          project.optionalCharacteristics = ["Three"];
          project.requiredCharacteristics = ["One", "Two"];

          return {
            updateProject: {
              __typename: "UpdateProjectPayload",
              project,
            },
          };
        },
      ),
      mockMutation(
        UPDATE_PROJECT,
        {
          id: project.id,
          goals: ["Goal one", "Goal two"],
        },
        () => {
          project.goals = ["Goal one", "Goal two"];

          return {
            updateProject: {
              __typename: "UpdateProjectPayload",
              project,
            },
          };
        },
      ),
      mockMutation(
        UPDATE_PROJECT,
        {
          id: project.id,
          likelyToHire: 2,
        },
        () => {
          project.likelyToHire = 2;

          return {
            updateProject: {
              __typename: "UpdateProjectPayload",
              project,
            },
          };
        },
      ),
      mockMutation(
        PUBLISH_PROJECT,
        {
          id: project.id,
        },
        () => {
          project.status = "PENDING_REVIEW";

          return {
            publishProject: {
              __typename: "PublishProjectPayload",
              project,
            },
          };
        },
      ),
    ],
  });

  await screen.findByText(/What skills should this specialist have?/i);
  userEvent.click(screen.getByText(/linkedin marketing/i));
  const skillsInput = screen.getByPlaceholderText("e.g Facebook Advertising");
  fireEvent.click(skillsInput);
  userEvent.type(skillsInput, "Face");
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  userEvent.click(screen.getByLabelText(/continue/i));

  await screen.findByText(/Which of these is the most important/i);
  userEvent.click(screen.getByText(/Facebook Marketing/i));

  await screen.findByText("jobSetup.experience.title");
  userEvent.click(screen.getByText("Important"));

  await screen.findByText(/how important is it that they are in/i);
  userEvent.click(screen.getByText("Important"));

  await screen.findByText(/What characteristics should/i);
  userEvent.type(screen.getByPlaceholderText(/communication skills/i), "One");
  userEvent.tab();
  userEvent.type(screen.getByPlaceholderText(/communication skills/i), "Two");
  userEvent.tab();
  userEvent.type(screen.getByPlaceholderText(/communication skills/i), "Three");
  userEvent.click(screen.getByLabelText(/continue/i));

  await screen.findByText(/which of these characteristics are essential/i);
  userEvent.click(screen.getByText("One"));
  userEvent.click(screen.getByText("Two"));
  userEvent.click(screen.getByLabelText(/continue/i));

  await screen.findByText(/Briefly describe your goals /i);
  userEvent.type(
    screen.getByPlaceholderText(/Building a facebook/i),
    "Goal one",
  );
  userEvent.tab();
  userEvent.type(
    screen.getByPlaceholderText(/Building a facebook/i),
    "Goal two",
  );
  userEvent.click(screen.getByLabelText(/continue/i));

  await screen.findByText(/If Advisable finds you the perfect/i);
  userEvent.click(screen.getByText("Very Likely"));

  await screen.findByText("Review Project");
  userEvent.click(screen.getByLabelText(/submit project/i));

  await screen.findByText(/reviewing your job/i);
});

test("When pending review redirects to published page", async () => {
  const user = mockData.user({
    industry: mockData.industry({
      popularSkills: {
        __typename: "SkillsConnection",
        nodes: [
          mockData.skill({ name: "Linkedin Marketing" }),
          mockData.skill({ name: "Instagram Marketing" }),
        ],
      },
    }),
  });

  const project = mockData.project({
    user,
    status: "PENDING_REVIEW",
    salesPerson: mockData.salesPerson(),
    skills: [mockData.skill({ name: "Linkedin Marketing" })],
    primarySkill: mockData.skill({ name: "Linkedin Marketing" }),
  });

  renderRoute({
    route: `/projects/${project.id}/setup`,
    graphQLMocks: [
      mockViewer(user),
      mockQuery(
        GET_JOB,
        { id: project.id },
        {
          skills: [
            mockData.skill({ name: "Facebook Marketing" }),
            mockData.skill({ name: "Twitter Marketing" }),
            mockData.skill({ name: "Linkedin Marketing" }),
            mockData.skill({ name: "Instagram Marketing" }),
          ],
          popularSkills: {
            __typename: "SkillsConnection",
            nodes: [
              mockData.skill({ name: "Facebook Marketing" }),
              mockData.skill({ name: "Twitter Marketing" }),
            ],
          },
          project,
        },
      ),
    ],
  });

  await screen.findByText(/reviewing your job/i);
});
