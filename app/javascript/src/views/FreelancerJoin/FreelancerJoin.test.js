import { fireEvent } from "@testing-library/react";
import generateType from "../../__mocks__/graphqlFields";
import { GraphQLError } from "graphql";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/apolloMocks";
import {
  renderRoute,
  mockData,
  mockBreakpoint,
} from "../../testHelpers/test-utils";
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
const projectId = "proj_01";
const project = mockData.project({ id: projectId });

const queries = [
  mockViewer(null),
  {
    request: {
      query: GET_PROJECT_JOIN,
      variables: {
        id: undefined,
      },
    },
    result: {
      errors: [
        new GraphQLError("Variable $id of type ID! was provided invalid value"),
      ],
    },
  },
  {
    request: {
      query: GET_PROJECT_JOIN,
      variables: {
        id: project.id,
      },
    },
    result: {
      data: {
        project,
      },
    },
  },
  mockQuery(GET_PROJECT_JOIN, { id: undefined }, { project }),
  mockQuery(GET_PROJECT_JOIN, { id: project.id }, { project }),
  {
    request: {
      query: GET_PROJECT,
      variables: {
        id: project.id,
      },
    },
    result: {
      data: {
        project,
      },
    },
  },
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
    {
      password: "123123123",
      passwordConfirmation: "123123123",
    },
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
  fireEvent.change(app.getByLabelText(/full name/i), {
    target: { value: viewer.name },
  });
  fireEvent.change(app.getByLabelText(/email/i), {
    target: { value: viewer.email },
  });
  fireEvent.click(app.getByLabelText(/get started/i));
  await app.findByText("Welcome to Advisable!");
  fireEvent.change(app.getByLabelText("Password"), {
    target: { value: "123123123" },
  });
  fireEvent.change(app.getByLabelText("Confirm password"), {
    target: { value: "123123123" },
  });
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
  fireEvent.change(app.getByLabelText(/full name/i), {
    target: { value: viewer.name },
  });
  fireEvent.change(app.getByLabelText(/email/i), {
    target: { value: viewer.email },
  });
  fireEvent.click(app.getByLabelText(/request more/i));
  await app.findByText("Welcome to Advisable!");
  fireEvent.change(app.getByLabelText("Password"), {
    target: { value: "123123123" },
  });
  fireEvent.change(app.getByLabelText("Confirm password"), {
    target: { value: "123123123" },
  });
  fireEvent.click(app.getByLabelText(/get started/i));
  await app.findByText(`${project.primarySkill.name} Project`);
});

test("display alt description", async () => {
  const project = mockData.project({
    id: projectId,
    specialistDescription: null,
  });
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
