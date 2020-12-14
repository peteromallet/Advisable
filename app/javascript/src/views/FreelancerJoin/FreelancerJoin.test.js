import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import generateType from "../../__mocks__/graphqlFields";
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
import VIEWER from "src/graphql/queries/viewer";
import { GET_PROJECT } from "../JobOpportunity/queries";

const viewer = generateType.specialist({
  confirmed: false,
  applicationStage: "Started",
  invitations: [],
});
let project = mockData.project({ user: mockData.user() });

const queries = [
  mockViewer(null),
  mockQuery(GET_PROJECT_JOIN, { id: project.id }, { project }),
  mockQuery(GET_PROJECT, { id: project.id }, { project }),
  mockMutation(
    CREATE_FREELANCER_ACCOUNT,
    {
      firstName: viewer.firstName,
      lastName: viewer.lastName,
      email: viewer.email,
      skills: [],
    },
    {
      createFreelancerAccount: {
        __typename: "CreateFreelancerAccountPayload",
        viewer: generateType.specialist({
          confirmed: false,
          applicationStage: "Started",
          invitations: [],
        }),
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
];

test("successful flow", async () => {
  const graphQLMocks = [...queries];
  const app = renderRoute({ route: `/freelancers/join`, graphQLMocks });
  await app.findByText(/advisable helps/i);
  userEvent.type(app.getByLabelText(/full name/i), viewer.name);
  userEvent.type(app.getByLabelText(/email/i), viewer.email);
  fireEvent.click(app.getByLabelText(/get started/i));
  await app.findByText("Welcome to Advisable!");
  userEvent.type(app.getByLabelText("Password"), "123123123");
  userEvent.type(app.getByLabelText("Confirm password"), "123123123");
  fireEvent.click(app.getByLabelText(/get started/i));
  await app.findByText(/thank you/i);
});

test("successful flow with project details", async () => {
  const graphQLMocks = [...queries];
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
  userEvent.type(app.getByLabelText(/full name/i), viewer.name);
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
  const description = `${project.user.companyName} is looking for a ${
    project.primarySkill?.name || project.skills[0].name
  } specialist and we think you're a great fit!`;
  await app.findByText(description);
});
