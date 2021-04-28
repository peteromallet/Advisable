import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  mockViewer,
  mockQuery,
  mockMutation,
  renderRoute,
  mockData,
  mockBreakpoint,
} from "test-utils";
import {
  CREATE_FREELANCER_ACCOUNT,
  GET_PROJECT as GET_PROJECT_JOIN,
  UPDATE_PASSWORD,
} from "./Steps/queries";
import VIEWER from "src/graphql/queries/getViewer.graphql";
import { GET_PROJECT } from "../JobOpportunity/queries";
import { GET_APPLICATIONS } from "../Applications/queries";
import { GET_SPECIALIST } from "../FreelancerApplication/queries";

const viewer = mockData.specialist({
  confirmed: false,
  applicationStage: "Started",
  needsToSetAPassword: false,
  invitations: [],
  resume: null,
  previousWorkDescription: null,
  previousWorkResults: null,
});
let project = mockData.project({ user: mockData.user() });

const queries = [
  mockViewer(null),
  mockQuery(GET_PROJECT_JOIN, { id: project.id }, { project }),
  mockQuery(GET_PROJECT, { id: project.id }, { project }),
  mockQuery(
    GET_APPLICATIONS,
    {},
    {
      viewer: {
        ...viewer,
        applications: [],
      },
    },
  ),
  mockMutation(
    UPDATE_PASSWORD,
    { password: "123123123", passwordConfirmation: "123123123" },
    {
      updatePassword: { viewer, __typename: "UpdatePasswordPayload" },
    },
  ),
  mockQuery(VIEWER, {}, { viewer: viewer }),
  mockQuery(
    GET_SPECIALIST,
    { id: viewer.id },
    { specialist: viewer, countries: null, skills: null, industries: null },
  ),
];

test("successful flow", async () => {
  const graphQLMocks = [
    ...queries,
    mockMutation(
      CREATE_FREELANCER_ACCOUNT,
      {
        firstName: viewer.firstName,
        lastName: viewer.lastName,
        email: viewer.email,
      },
      {
        createFreelancerAccount: {
          __typename: "CreateFreelancerAccountPayload",
          viewer: mockData.specialist({
            confirmed: false,
            needsToSetAPassword: true,
            applicationStage: "Started",
            invitations: [],
          }),
        },
      },
    ),
  ];
  const app = renderRoute({ route: `/freelancers/join`, graphQLMocks });
  await app.findByText(/advisable helps/i);
  userEvent.type(app.getByLabelText(/first name/i), viewer.firstName);
  userEvent.type(app.getByLabelText(/last name/i), viewer.lastName);
  userEvent.type(app.getByLabelText(/email/i), viewer.email);
  fireEvent.click(app.getByLabelText(/get started/i));
  await app.findByText("Welcome to Advisable!");
  userEvent.type(app.getByLabelText("Password"), "123123123");
  userEvent.type(app.getByLabelText("Confirm password"), "123123123");
  fireEvent.click(app.getByLabelText(/get started/i));
  await app.findByText("Welcome to Advisable");
});

test("successful flow with project details", async () => {
  const graphQLMocks = [
    ...queries,
    mockMutation(
      CREATE_FREELANCER_ACCOUNT,
      {
        firstName: viewer.firstName,
        lastName: viewer.lastName,
        email: viewer.email,
        pid: project.id,
      },
      {
        createFreelancerAccount: {
          __typename: "CreateFreelancerAccountPayload",
          viewer: mockData.specialist({
            confirmed: false,
            needsToSetAPassword: true,
            applicationStage: "Started",
            invitations: [],
          }),
        },
      },
    ),
  ];
  mockBreakpoint("mUp");
  const app = renderRoute({
    route: `/freelancers/join?pid=${project.id}`,
    graphQLMocks,
  });
  await app.findByText(/advisable helps/i);
  await app.findByText(project.industry);
  const location = project.remote
    ? "remote"
    : [project.user.city, project.user.country].filter(Boolean).join(", ");
  await app.findByText(location);
  await app.findByText(project.estimatedBudget);
  await app.findByText(project.specialistDescription);
  userEvent.type(app.getByLabelText(/first name/i), viewer.firstName);
  userEvent.type(app.getByLabelText(/last name/i), viewer.lastName);
  userEvent.type(app.getByLabelText(/email/i), viewer.email);
  fireEvent.click(app.getByLabelText(/request more/i));
  await app.findByText("Welcome to Advisable!");
  userEvent.type(app.getByLabelText("Password"), "123123123");
  userEvent.type(app.getByLabelText("Confirm password"), "123123123");
  fireEvent.click(app.getByLabelText(/get started/i));
  await app.findByText(`${project.primarySkill.name} Project`);
});

test("display alt description", async () => {
  project = mockData.project({ ...project, specialistDescription: null });
  mockBreakpoint("mUp");
  const graphQLMocks = [...queries];
  const app = renderRoute({
    route: `/freelancers/join?pid=${project.id}`,
    graphQLMocks,
  });
  await app.findByText(/advisable helps/i);
  const description = `Sign up to access this ${
    project.primarySkill?.name || ""
  } opportunity:`;
  await app.findByText(description);
});
