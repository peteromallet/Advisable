import { cleanup, fireEvent } from "@testing-library/react";
import renderApp from "../testHelpers/renderApp";
import viewer from "../graphql/queries/viewer";
import getApplication from "../views/ApplicationFlow/fetchApplication";
import updateApplication from "../views/ApplicationFlow/updateApplication";
import generateTypes from "../__mocks__/graphqlFields";

afterEach(cleanup);

test("Submitting the overview step continues to the questions step", async () => {
  const { findByLabelText, getByText, findByText, debug } = renderApp({
    route: "/invites/rec1234/apply",
    graphQLMocks: [
      // Mock the initial viewer request so that we have an unauthenticated user
      {
        request: {
          query: viewer,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
      // Mock the request to fetch the initial application
      {
        request: {
          query: getApplication,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            application: generateTypes.application({
              airtableId: "rec1234",
              status: "Invited To Apply",
              availablity: null,
              questions: [],
              specialist: generateTypes.specialist(),
              project: generateTypes.project({
                questions: ["This is the first question?"],
              }),
            }),
          },
        },
      },
      // Mock the response for the first updateApplication mutation when the
      // user submits the overview step
      {
        request: {
          query: updateApplication,
          variables: {
            input: {
              id: "rec1234",
              introduction: "Introduction",
              availability: "2 - 4 Weeks",
            },
          },
        },
        result: {
          data: {
            updateApplication: {
              __typename: "UpdateApplicationPayload",
              application: generateTypes.application({
                questions: [],
                airtableId: "rec1234",
                status: "Invited To Apply",
                availablity: "2 - 4 Weeks",
                introduction: "Introduction",
                specialist: generateTypes.specialist(),
                previousProjects: [],
                project: generateTypes.project({
                  questions: ["This is the first question?"],
                }),
              }),
              errors: null,
            },
          },
        },
      },
    ],
  });

  const intro = await findByLabelText(
    "Give a 2-3 line description of your background as it related to this project."
  );
  fireEvent.change(intro, { target: { value: "Introduction" } });
  const availablity = getByText("2 - 4 weeks");
  fireEvent.click(availablity);
  const next = await findByLabelText("Next");
  fireEvent.click(next);
  const question = await findByText("This is the first question?");
  expect(question).toBeInTheDocument();
});

test("Submitting a question answer continues to the next question", async () => {
  const { findByLabelText, findByText } = renderApp({
    route: "/invites/rec1234/apply/questions/1",
    graphQLMocks: [
      {
        request: {
          query: viewer,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
      {
        request: {
          query: getApplication,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            application: generateTypes.application({
              id: "rec1234",
              airtableId: "rec1234",
              status: "Invited To Apply",
              availablity: null,
              questions: [],
              specialist: generateTypes.specialist(),
              project: generateTypes.project({
                questions: [
                  "This is the first question?",
                  "This is the second question?",
                ],
              }),
            }),
          },
        },
      },
      {
        request: {
          query: updateApplication,
          variables: {
            input: {
              id: "rec1234",
              questions: [
                {
                  question: "This is the first question?",
                  answer: "This is the first answer",
                },
              ],
            },
          },
        },
        result: {
          data: {
            updateApplication: {
              __typename: "UpdateApplicationPayload",
              application: generateTypes.application({
                id: "rec1234",
                questions: [
                  {
                    question: "This is the first question?",
                    answer: "This is the first answer",
                  },
                ],
                airtableId: "rec1234",
                status: "Invited To Apply",
                availablity: "2 - 4 Weeks",
                introduction: "Introduction",
                specialist: generateTypes.specialist(),
                project: generateTypes.project({
                  questions: [
                    "This is the first question?",
                    "This is the second question?",
                  ],
                }),
              }),
              errors: null,
            },
          },
        },
      },
    ],
  });

  const intro = await findByLabelText("This is the first question?");
  fireEvent.change(intro, { target: { value: "This is the first answer" } });
  const next = await findByLabelText("Next");
  fireEvent.click(next);
  const question = await findByText("This is the second question?");
  expect(question).toBeInTheDocument();
});

test("when submitting the last question answer it continues to the references step", async () => {
  const { findByLabelText, findByText } = renderApp({
    route: "/invites/rec1234/apply/questions/2",
    graphQLMocks: [
      {
        request: {
          query: viewer,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
      {
        request: {
          query: getApplication,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            application: generateTypes.application({
              id: "rec1234",
              airtableId: "rec1234",
              status: "Invited To Apply",
              availablity: null,
              questions: [
                {
                  __typename: "ApplicationQuestion",
                  question: "This is the first question?",
                  answer: "This is the first answer",
                },
              ],
              specialist: generateTypes.specialist(),
              project: generateTypes.project({
                questions: [
                  "This is the first question?",
                  "This is the second question?",
                ],
              }),
            }),
          },
        },
      },
      {
        request: {
          query: updateApplication,
          variables: {
            input: {
              id: "rec1234",
              questions: [
                {
                  question: "This is the second question?",
                  answer: "This is the second answer",
                },
              ],
            },
          },
        },
        result: {
          data: {
            updateApplication: {
              __typename: "UpdateApplicationPayload",
              application: generateTypes.application({
                id: "rec1234",
                questions: [
                  {
                    __typename: "ApplicationQuestion",
                    question: "This is the first question?",
                    answer: "This is the first answer",
                  },
                  {
                    __typename: "ApplicationQuestion",
                    question: "This is the second question?",
                    answer: "This is the second answer",
                  },
                ],
                airtableId: "rec1234",
                status: "Invited To Apply",
                availablity: "2 - 4 Weeks",
                introduction: "Introduction",
                specialist: generateTypes.specialist(),
                project: generateTypes.project({
                  questions: [
                    "This is the first question?",
                    "This is the second question?",
                  ],
                }),
              }),
              errors: null,
            },
          },
        },
      },
    ],
  });

  const intro = await findByLabelText("This is the second question?");
  fireEvent.change(intro, { target: { value: "This is the second answer" } });
  const next = await findByLabelText("Next");
  fireEvent.click(next);
  const description = await findByText(
    "We require references from all freelancers prior to their first project on Advisable. We do this to ensure that their self-reported experience is verified by a third party. Only once verified will these references be shown on your profile and visible to clients."
  );
  expect(description).toBeInTheDocument();
});

test("when the project is closed it renders the applications closed view", async () => {
  const { findByText } = renderApp({
    route: "/invites/rec1234/apply",
    graphQLMocks: [
      {
        request: {
          query: viewer,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
      {
        request: {
          query: getApplication,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            application: generateTypes.application({
              status: "Invited To Apply",
              specialist: generateTypes.specialist(),
              project: generateTypes.project({
                applicationsOpen: false,
              }),
            }),
          },
        },
      },
    ],
  });

  const title = await findByText("projects.applicationsClosed.title");
  expect(title).toBeInTheDocument();
});
