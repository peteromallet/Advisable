import { fireEvent } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import mockData, { offPlatformProject } from "../../__mocks__/graphqlFields";
import GET_APPLICATION from "./fetchApplication";
import UPDATE from "./updateApplication";
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
      UPDATE,
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
            ...application,
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
      UPDATE,
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
            ...application,
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
      UPDATE,
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
            ...application,
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

  const question2 = await app.findByLabelText(project.questions[1]);
  fireEvent.change(question2, { target: { value: "The second answer" } });
  submit = app.getByLabelText("Next");
  fireEvent.click(submit);

  const text = await app.findByText(
    "We require references from all freelancers",
    { exact: false },
  );
  expect(text).toBeInTheDocument();
});

test("References continue to payment terms step", async () => {
  const project1 = offPlatformProject({
    airtableId: "recopp1",
    skills: ["Online marketing"],
  });

  const project2 = offPlatformProject({
    airtableId: "recopp2",
    skills: ["Twitter marketing"],
  });

  const { specialist, application, project } = setupData({
    specialist: {
      previousProjects: [
        {
          __typename: "PreviousProject",
          project: project1,
        },
        {
          __typename: "PreviousProject",
          project: project2,
        },
      ],
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
      UPDATE,
      {
        id: application.airtableId,
        references: [project1.airtableId, project2.airtableId],
      },
      {
        updateApplication: {
          __typename: "UpdateApplicationPayload",
          errors: null,
          application: application,
        },
      },
    ),
  ];

  const app = renderApp({
    route: `/invites/${application.airtableId}/apply/references`,
    graphQLMocks,
  });

  const selection1 = await app.findByTestId(
    project1.airtableId,
    {},
    { timeout: 5000 },
  );
  fireEvent.click(selection1);
  const selection2 = app.getByTestId(project2.airtableId);
  fireEvent.click(selection2);
  const button = app.getByLabelText("Next");
  fireEvent.click(button);

  const header = await app.findByText("Including Advisable's fee", {
    exact: false,
  });
  expect(header).toBeInTheDocument();
});
