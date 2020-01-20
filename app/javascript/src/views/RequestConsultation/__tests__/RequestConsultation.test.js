import { fireEvent, cleanup } from "@testing-library/react";
import renderApp from "../../../testHelpers/renderApp";
import mockData from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import FETCH_SPECIALIST from "../fetchSpecialist";
import CREATE_CONSULTATION from "../createConsultation";
import GET_CONSULTATION from "../getConsultation";
import SEND_CONSULTATION_REQUESTION from "../sendRequest";

afterEach(cleanup);

test("Skills step continues to the company details", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });

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
        query: FETCH_SPECIALIST,
        variables: {
          id: specialist.airtableId,
        },
      },
      result: {
        data: {
          specialist,
        },
      },
    },
  ];

  const app = renderApp({
    route: `/request_consultation/${specialist.airtableId}`,
    graphQLMocks,
  });

  const skillTag = await app.findByText("Testing");
  fireEvent.click(skillTag);
  const btn = app.getByLabelText("Continue");
  fireEvent.click(btn);
  const step2 = await app.findByText("Step 2");
  expect(step2).toBeInTheDocument();
});

test("company details step continues to availability", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });
  const consultation = mockData.consultation({
    specialist,
    user: mockData.user(),
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
        query: FETCH_SPECIALIST,
        variables: {
          id: specialist.airtableId,
        },
      },
      result: {
        data: {
          specialist,
        },
      },
    },
    {
      request: {
        query: CREATE_CONSULTATION,
        variables: {
          input: {
            specialist: specialist.airtableId,
            firstName: "Jane",
            lastName: "Doe",
            email: "test@test.com",
            company: "Testing",
            skill: "Testing",
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          createConsultation: {
            __typename: "CreateConsultationPayload",
            consultation,
          },
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
  ];

  const app = renderApp({
    route: {
      pathname: `/request_consultation/${specialist.airtableId}/details`,
      state: {
        skill: "Testing",
      },
    },
    graphQLMocks,
  });

  const firstName = await app.findByLabelText("First Name");
  const lastName = app.getByLabelText("Last Name");
  const email = app.getByLabelText("Email Address");
  const company = app.getByLabelText("Company Name");
  const btn = app.getByLabelText("Continue");
  fireEvent.change(firstName, { target: { value: "Jane" } });
  fireEvent.change(lastName, { target: { value: "Doe" } });
  fireEvent.change(email, { target: { value: "test@test.com" } });
  fireEvent.change(company, { target: { value: "Testing" } });
  fireEvent.click(btn);
  const header = await app.findByText(
    "Select the times you will be available",
    { exact: false }
  );

  expect(header).toBeInTheDocument();
});

test("Topic step sends the consultation", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });
  const consultation = mockData.consultation({
    specialist,
    user: mockData.user(),
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
        query: FETCH_SPECIALIST,
        variables: {
          id: specialist.airtableId,
        },
      },
      result: {
        data: {
          specialist,
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
        query: SEND_CONSULTATION_REQUESTION,
        variables: {
          input: {
            consultation: consultation.id,
            topic: "Testing",
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          sendConsultationRequest: {
            __typename: "SendConsultationRequestPayload",
            consultation: {
              ...consultation,
              status: "Request Completed",
            },
          },
        },
      },
    },
  ];

  const app = renderApp({
    route: {
      pathname: `/request_consultation/${specialist.airtableId}/topic`,
      state: {
        skill: "Testing",
        consultationId: consultation.id,
      },
    },
    graphQLMocks,
  });

  const textarea = await app.findByPlaceholderText(
    "What would you like to talk about..."
  );
  fireEvent.change(textarea, { target: { value: "Testing" } });
  const btn = app.getByLabelText("Continue");
  fireEvent.click(btn);
  const header = await app.findByText(
    "Check your email to confirm your request"
  );

  expect(header).toBeInTheDocument();
});
