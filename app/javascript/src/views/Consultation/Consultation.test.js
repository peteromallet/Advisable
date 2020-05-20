import { fireEvent } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import mockData from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import GET_CONSULTATION from "./getConsultation";
import ACCEPT_CONSULTATION from "./acceptConsultation";
import DECLINE_CONSULTATION from "./declineConsultation";
import { FETCH_INTERVIEW } from "../InterviewRequest/queries";

test("Accepting a consultation request", async () => {
  const user = mockData.user();
  const specialist = mockData.specialist();
  const consultation = mockData.consultation({
    status: "Request Completed",
    user,
    specialist,
  });

  const interview = mockData.interview({
    user,
    application: mockData.application({
      specialist,
    }),
  });

  const graphQLMocks = [
    {
      request: {
        query: VIEWER,
      },
      result: {
        data: {
          viewer: null,
        },
      },
    },
    {
      request: {
        query: GET_CONSULTATION,
        variables: { id: consultation.id },
      },
      result: {
        data: {
          consultation,
        },
      },
    },
    {
      request: {
        query: ACCEPT_CONSULTATION,
        variables: {
          input: {
            consultation: consultation.id,
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          acceptConsultation: {
            __typename: "AcceptConsultationPayload",
            interview,
          },
        },
      },
    },
    {
      request: {
        query: FETCH_INTERVIEW,
        variables: { id: interview.airtableId },
      },
      result: {
        data: {
          interview,
        },
      },
    },
  ];

  const app = renderApp({
    route: `/consultations/${consultation.id}`,
    graphQLMocks,
  });

  const btn = await app.findByLabelText("Accept Request");
  fireEvent.click(btn);
  const text = await app.findByText("has requested a call", { exact: false });
  expect(text).toBeInTheDocument();
});

test("Declining a consultation request", async () => {
  const user = mockData.user();
  const specialist = mockData.specialist();
  const consultation = mockData.consultation({
    status: "Request Completed",
    user,
    specialist,
  });

  const graphQLMocks = [
    {
      request: {
        query: VIEWER,
      },
      result: {
        data: {
          viewer: null,
        },
      },
    },
    {
      request: {
        query: GET_CONSULTATION,
        variables: { id: consultation.id },
      },
      result: {
        data: {
          consultation,
        },
      },
    },
    {
      request: {
        query: DECLINE_CONSULTATION,
        variables: {
          input: {
            consultation: consultation.id,
            reason: "Reason",
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          declineConsultation: {
            __typename: "DeclineConsultationPayload",
            consultation: {
              ...consultation,
              status: "Specialist Rejected",
            },
          },
        },
      },
    },
  ];

  const app = renderApp({
    route: `/consultations/${consultation.id}`,
    graphQLMocks,
  });

  const btn = await app.findByLabelText("Decline Request");
  fireEvent.click(btn);
  const reason = app.getByLabelText(
    "What is your reason for declining this consultation?",
  );
  fireEvent.change(reason, { target: { value: "Reason" } });
  fireEvent.click(await app.findByLabelText("Decline Consultation"));
  const text = await app.findByText(
    "You have declined this consultation request",
  );
  expect(text).toBeInTheDocument();
});

test("redirects to the interview when already accepted", async () => {
  const user = mockData.user();
  const specialist = mockData.specialist();
  const interview = mockData.interview({
    user,
    application: mockData.application({
      specialist,
    }),
  });

  const consultation = mockData.consultation({
    status: "Accepted By Specialist",
    user,
    specialist,
    interview,
  });

  const graphQLMocks = [
    {
      request: {
        query: VIEWER,
      },
      result: {
        data: {
          viewer: null,
        },
      },
    },
    {
      request: {
        query: GET_CONSULTATION,
        variables: { id: consultation.id },
      },
      result: {
        data: {
          consultation,
        },
      },
    },
    {
      request: {
        query: FETCH_INTERVIEW,
        variables: { id: interview.airtableId },
      },
      result: {
        data: {
          interview,
        },
      },
    },
  ];

  const app = renderApp({
    route: `/consultations/${consultation.id}`,
    graphQLMocks,
  });

  const text = await app.findByText("has requested a call", { exact: false });
  expect(text).toBeInTheDocument();
});
