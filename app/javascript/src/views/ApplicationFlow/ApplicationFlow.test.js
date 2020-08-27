import { fireEvent } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import mockData from "../../__mocks__/graphqlFields";
import {
  fetchApplication as GET_APPLICATION,
  updateOverviewStep,
  updateQuestionStep,
  updateReferencesStep,
} from "./queries";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/apolloMocks";

function setupData(overrides = {}) {
  const project = mockData.project({
    questions: ["Question one", "Question two"],
    ...overrides.project,
  });

  const specialist = mockData.specialist(overrides.specialist);

  const application = mockData.application({
    project,
    specialist,
    status: "Invited To Apply",
    questions: [],
    ...overrides.application,
  });

  return {
    project,
    specialist,
    application,
  };
}

test("Overview step continues to the questions step", async () => {
  const { specialist, application } = setupData();
  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(GET_APPLICATION, { id: application.airtableId }, { application }),
    mockMutation(
      updateOverviewStep,
      {
        id: application.airtableId,
        introduction: "This is an overview",
        availability: "2 - 4 weeks",
      },
      {
        updateApplication: {
          __typename: "UpdateApplicationPayload",
          errors: null,
          application: {
            __typename: "Application",
            id: application.airtableId,
            introduction: "This is an overview",
            availability: "2 - 4 weeks",
          },
        },
      },
    ),
  ];

  const app = renderApp({
    route: `/invites/${application.airtableId}/apply`,
    graphQLMocks,
  });

  const overview = await app.findByLabelText(
    "Give a 2-3 line description",
    {
      exact: false,
    },
    {
      timeout: 5000,
    },
  );
  fireEvent.change(overview, { target: { value: "This is an overview" } });
  const availability = app.getByText("2 - 4 weeks");
  fireEvent.click(availability);
  const button = app.getByLabelText("Next");
  fireEvent.click(button);
  await app.findByText("Question one");
});

test("Questions step continues to the references step", async () => {
  const { specialist, application, project } = setupData();

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(GET_APPLICATION, { id: application.airtableId }, { application }),
    mockMutation(
      updateQuestionStep,
      {
        id: application.airtableId,
        questions: [
          {
            question: project.questions[0],
            answer: "The first answer",
          },
        ],
      },
      {
        updateApplication: {
          __typename: "UpdateApplicationPayload",
          errors: null,
          application: {
            __typename: "Application",
            id: application.airtableId,
            questions: [
              mockData.applicationQuestion({
                question: project.questions[0],
                answer: "The first answer",
              }),
            ],
          },
        },
      },
    ),
    mockMutation(
      updateQuestionStep,
      {
        id: application.airtableId,
        questions: [
          {
            question: project.questions[1],
            answer: "The second answer",
          },
        ],
      },
      {
        updateApplication: {
          __typename: "UpdateApplicationPayload",
          errors: null,
          application: {
            __typename: "Application",
            id: application.airtableId,
            questions: [
              mockData.applicationQuestion({
                question: project.questions[0],
                answer: "The first answer",
              }),
              mockData.applicationQuestion({
                question: project.questions[1],
                answer: "The second answer",
              }),
            ],
          },
        },
      },
    ),
  ];

  const app = renderApp({
    route: `/invites/${application.airtableId}/apply/questions`,
    graphQLMocks,
  });

  const question1 = await app.findByLabelText(
    project.questions[0],
    {},
    { timeout: 5000 },
  );
  fireEvent.change(question1, { target: { value: "The first answer" } });
  let submit = app.getByLabelText("Next");
  fireEvent.click(submit);
  await app.findByText("Are you sure?");
  fireEvent.click(await app.findByLabelText("Ignore"));

  const question2 = await app.findByLabelText(project.questions[1]);
  fireEvent.change(question2, { target: { value: "The second answer" } });
  submit = app.getByLabelText("Next");
  fireEvent.click(submit);
  await app.findByText("Are you sure?");
  fireEvent.click(await app.findByLabelText("Ignore"));

  const text = await app.findByText(
    /Previous projects are the most effective way/i,
    { exact: false },
  );
  app.debug();
  expect(text).toBeInTheDocument();
});

test("References continue to payment terms step", async () => {
  const project1 = mockData.previousProject();
  const project2 = mockData.previousProject();

  const { specialist, application } = setupData({
    specialist: {
      previousProjects: {
        __typename: "PreviousProjectsConnection",
        nodes: [project1, project2],
      },
    },
    application: {
      questions: [
        mockData.applicationQuestion({
          question: "Question one",
          answer: "Answer one",
        }),
        mockData.applicationQuestion({
          question: "Question two",
          answer: "Answer one",
        }),
      ],
    },
  });

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(GET_APPLICATION, { id: application.airtableId }, { application }),
    mockMutation(
      updateReferencesStep,
      {
        id: application.airtableId,
        references: [project1.id, project2.id],
      },
      {
        updateApplication: {
          __typename: "UpdateApplicationPayload",
          errors: null,
          application: {
            __typename: "Application",
            id: application.airtableId,
            previousProjects: application.previousProjects.map((ref) => ({
              __typename: "PreviousProject",
              id: ref.id,
            })),
          },
        },
      },
    ),
  ];

  const app = renderApp({
    route: `/invites/${application.airtableId}/apply/references`,
    graphQLMocks,
  });

  const selection1 = await app.findByTestId(project1.id, {}, { timeout: 5000 });
  fireEvent.click(selection1);
  const selection2 = app.getByTestId(project2.id);
  fireEvent.click(selection2);
  const button = app.getByLabelText("Next");
  fireEvent.click(button);

  const header = await app.findByText("Including Advisable's fee", {
    exact: false,
  });
  expect(header).toBeInTheDocument();
});
