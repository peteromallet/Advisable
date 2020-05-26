import {
  renderRoute,
  fireEvent,
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/test-utils";
import mockData from "../../__mocks__/graphqlFields";
import {
  GET_SPECIALIST,
  CREATE_CONSULTATION,
  UPDATE_CONSULTATION,
  SEND_CONSULTATION,
  GET_CONSULTATION,
} from "./queries";

test("Skills step continues to the company details", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_SPECIALIST, { id: specialist.airtableId }, { specialist }),
  ];

  const app = renderRoute({
    route: `/request_consultation/${specialist.airtableId}`,
    graphQLMocks,
  });

  const skillTag = await app.findByText("Testing", {}, { timeout: 5000 });
  fireEvent.click(skillTag);
  const btn = app.getByLabelText("Continue");
  fireEvent.click(btn);
  const heading = await app.findByText(/Company Information/i);
  expect(heading).toBeInTheDocument();
});

test("When logged in the skills step continues to availability", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });
  const viewer = mockData.user();
  const consultation = mockData.consultation({
    specialist,
    user: viewer,
  });

  const graphQLMocks = [
    mockViewer(viewer),
    mockQuery(GET_SPECIALIST, { id: specialist.airtableId }, { specialist }),
    mockMutation(
      CREATE_CONSULTATION,
      {
        specialist: specialist.airtableId,
        skill: "Testing",
      },
      {
        createConsultation: {
          __typename: "CreateConsultationPayload",
          consultation,
        },
      },
    ),
    mockQuery(GET_CONSULTATION, { id: consultation.id }, { consultation }),
  ];

  const app = renderRoute({
    route: `/request_consultation/${specialist.airtableId}`,
    graphQLMocks,
  });

  const skillTag = await app.findByText("Testing", {}, { timeout: 5000 });
  fireEvent.click(skillTag);
  const btn = app.getByLabelText("Continue");
  fireEvent.click(btn);
  const heading = await app.findByText(
    /Select the times you will be available/i,
  );
  expect(heading).toBeInTheDocument();
});

test("company details step continues to availability", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });
  const consultation = mockData.consultation({
    specialist,
    user: mockData.user(),
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_SPECIALIST, { id: specialist.airtableId }, { specialist }),
    mockMutation(
      CREATE_CONSULTATION,
      {
        specialist: specialist.airtableId,
        firstName: "Jane",
        lastName: "Doe",
        email: "test@test.com",
        company: "Testing",
        skill: "Testing",
      },
      {
        createConsultation: {
          __typename: "CreateConsultationPayload",
          consultation,
        },
      },
    ),
    mockQuery(GET_CONSULTATION, { id: consultation.id }, { consultation }),
  ];

  const app = renderRoute({
    route: {
      pathname: `/request_consultation/${specialist.airtableId}/details`,
      state: {
        skill: "Testing",
      },
    },
    graphQLMocks,
  });

  const firstName = await app.findByLabelText(
    "First Name",
    {},
    { timeout: 5000 },
  );
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
    { exact: false },
  );

  expect(header).toBeInTheDocument();
});

test("Company details step redirects back if no skill is in state", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_SPECIALIST, { id: specialist.airtableId }, { specialist }),
  ];

  const app = renderRoute({
    route: `/request_consultation/${specialist.airtableId}/details`,
    graphQLMocks,
  });

  const header = await app.findByText(/Please select which/i, {
    timeout: 5000,
  });
  expect(header).toBeInTheDocument();
});

test("Topic step continues to the send step", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });
  const consultation = mockData.consultation({
    specialist,
    user: mockData.user(),
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_SPECIALIST, { id: specialist.airtableId }, { specialist }),
    mockQuery(GET_CONSULTATION, { id: consultation.id }, { consultation }),
    mockMutation(
      UPDATE_CONSULTATION,
      { id: consultation.id, topic: "Testing" },
      {
        updateConsultation: {
          __typename: "UpdateConsultationPayload",
          consultation: {
            ...consultation,
            topic: "Testing",
          },
        },
      },
    ),
  ];

  const app = renderRoute({
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
    "What would you like to talk about...",
    {},
    { timeout: 5000 },
  );
  fireEvent.change(textarea, { target: { value: "Testing" } });
  const btn = app.getByLabelText("Continue");
  fireEvent.click(btn);
  const header = await app.findByText("If you're impressed", { exact: false });

  expect(header).toBeInTheDocument();
});

test("Topic step redirects back if there is no consultationId in route state", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_SPECIALIST, { id: specialist.airtableId }, { specialist }),
  ];

  const app = renderRoute({
    route: {
      pathname: `/request_consultation/${specialist.airtableId}/topic`,
      state: {
        skill: "Testing",
      },
    },
    graphQLMocks,
  });

  const firstName = await app.findByText(/skills are you interested/i);
  expect(firstName).toBeInTheDocument();
});

test("Send step sends the consultation request", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });
  const consultation = mockData.consultation({
    specialist,
    user: mockData.user(),
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_SPECIALIST, { id: specialist.airtableId }, { specialist }),
    mockQuery(GET_CONSULTATION, { id: consultation.id }, { consultation }),
    mockMutation(
      SEND_CONSULTATION,
      {
        consultation: consultation.id,
        likelyToHire: 4,
      },
      {
        sendConsultationRequest: {
          __typename: "SendConsultationRequestPayload",
          consultation: {
            ...consultation,
            status: "Request Completed",
          },
        },
      },
    ),
  ];

  const app = renderRoute({
    route: {
      pathname: `/request_consultation/${specialist.airtableId}/send`,
      state: {
        skill: "Testing",
        consultationId: consultation.id,
      },
    },
    graphQLMocks,
  });

  await app.findByText("If you're impressed", { exact: false });
  const rating = app.getByLabelText("4");
  fireEvent.click(rating);
  const btn = app.getByLabelText("Request Consultation");
  fireEvent.click(btn);
  const header = await app.findByText("Check your email", { exact: false });
  expect(header).toBeInTheDocument();
});

test("Can link back to a particular consultation via query params", async () => {
  const skill = mockData.specialistSkill({ name: "Testing" });
  const specialist = mockData.specialist({ skills: [skill] });
  const consultation = mockData.consultation({
    specialist,
    user: mockData.user(),
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(GET_SPECIALIST, { id: specialist.airtableId }, { specialist }),
    mockQuery(GET_CONSULTATION, { id: consultation.id }, { consultation }),
  ];

  const app = renderRoute({
    route: `/request_consultation/${specialist.airtableId}?consultation=${consultation.id}`,
    graphQLMocks,
  });

  const header = await app.findByText(
    "Select the times you will be available",
    { exact: false },
  );

  expect(header).toBeInTheDocument();
});
