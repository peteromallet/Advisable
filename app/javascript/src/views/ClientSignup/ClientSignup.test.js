import { Settings } from "luxon";
import {
  fireEvent,
  renderRoute,
  screen,
  mockViewer,
  mockData,
  mockQuery,
  mockMutation,
} from "../../testHelpers/test-utils";

import {
  QUERY_COUNTRY_CODE,
  ABOUT_COMPANY_QUERY,
  GET_CLIENT_APPLICATION,
  START_CLIENT_APPLICATION,
  ABOUT_COMPANY_UPDATE,
  ABOUT_REQUIREMENTS_QUERY,
  ABOUT_REQUIREMENTS_UPDATE,
  SUBMIT_CLIENT_APPLICATION,
  REQUEST_APPLICATION_CALLBACK,
  REQUEST_APPLICATION_REMINDER,
  RESET_CLIENT_APPLICATION,
} from "./queries";

// Mock data
const WORK_HOURS_START_INITIAL = process.env.WORK_HOURS_START;
const WORK_HOURS_END_INITIAL = process.env.WORK_HOURS_END;

beforeAll(() => {
  process.env.WORK_HOURS_START = "14:00:00+01:00";
  process.env.WORK_HOURS_END = "21:00:00+01:00";
});

afterAll(() => {
  process.env.WORK_HOURS_START = WORK_HOURS_START_INITIAL;
  process.env.WORK_HOURS_END = WORK_HOURS_END_INITIAL;
});

const skill = mockData.skill();
const industry = mockData.industry();
const mockClientApplication = mockData.clientApplication;
const clientApplication = mockClientApplication();
const email = "test@test.com";
const companyName = "Test Corp";
const companyType = "Startup";
const budget = "10000";
const localityImportance = 3;
const acceptedGuaranteeTerms = false;
const talentQuality = "GOOD";
const phoneNumber = "+353123456789";

const graphQLMocks = [
  mockViewer(null),
  mockQuery(
    ABOUT_COMPANY_QUERY,
    { id: clientApplication.id },
    {
      industries: [
        {
          __typename: "Industry",
          id: industry.id,
          label: industry.name,
          value: industry.name,
        },
      ],
      skills: [
        {
          __typename: "Skill",
          id: skill.id,
          label: skill.name,
          value: skill.name,
        },
      ],
      clientApplication,
    },
  ),
  mockQuery(
    GET_CLIENT_APPLICATION,
    { id: clientApplication.id },
    { clientApplication },
  ),
  mockQuery(
    ABOUT_REQUIREMENTS_QUERY,
    { id: clientApplication.id },
    {
      skills: [
        {
          __typename: "Skill",
          id: skill.id,
          label: skill.name,
          value: skill.name,
        },
      ],
      clientApplication,
    },
  ),
  mockQuery(
    QUERY_COUNTRY_CODE,
    { id: clientApplication.id },
    {
      clientApplication: {
        ...clientApplication,
        country: mockData.country(),
      },
    },
  ),
  mockMutation(
    START_CLIENT_APPLICATION,
    {
      firstName: clientApplication.firstName,
      lastName: clientApplication.lastName,
      email,
      rid: null,
      utmCampaign: null,
      utmSource: null,
      utmMedium: null,
    },
    {
      startClientApplication: {
        __typename: "StartClientApplicationPayload",
        clientApplication,
      },
    },
  ),
  mockMutation(
    ABOUT_COMPANY_UPDATE,
    {
      id: clientApplication.id,
      companyName,
      industry: industry.name,
      companyType,
    },
    {
      updateClientApplication: {
        __typename: "UpdateClientApplicationPayload",
        clientApplication: {
          __typename: "ClientApplication",
          id: clientApplication.id,
          companyName,
          industry,
          companyType,
        },
      },
    },
  ),
  mockMutation(
    REQUEST_APPLICATION_CALLBACK,
    {
      id: clientApplication.id,
      phoneNumber,
    },
    {
      requestApplicationCallback: {
        __typename: "RequestApplicationCallbackPayload",
        clientApplication: {
          __typename: "ClientApplication",
          id: clientApplication.id,
        },
      },
    },
  ),
];

test("Successful client application flow and ASAP call", async () => {
  Settings.now = () => new Date(Date.UTC(2020, 4, 27, 16, 0, 0, 0)).valueOf();
  renderRoute({
    route: "/clients/signup",
    graphQLMocks: [
      ...graphQLMocks,
      mockMutation(
        ABOUT_REQUIREMENTS_UPDATE,
        {
          id: clientApplication.id,
          skills: [skill.name],
          numberOfFreelancers: "1-3",
          budget: Number(budget) * 100,
        },
        {
          updateClientApplication: {
            __typename: "UpdateClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              skills: [skill],
              numberOfFreelancers: "1-3",
              budget,
            },
          },
        },
      ),
      mockMutation(
        SUBMIT_CLIENT_APPLICATION,
        {
          id: clientApplication.id,
          localityImportance,
          acceptedGuaranteeTerms,
          talentQuality,
        },
        {
          submitClientApplication: {
            __typename: "SubmitClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              localityImportance,
              acceptedGuaranteeTerms,
              talentQuality,
              status: "Application Accepted",
              rejectionReason: null,
            },
          },
        },
      ),
    ],
  });

  // 0 Step. Start application
  fireEvent.change(await screen.findByPlaceholderText(/first name/i), {
    target: { value: clientApplication.firstName },
  });
  fireEvent.change(await screen.findByPlaceholderText(/last name/i), {
    target: { value: clientApplication.lastName },
  });
  const emailInput = await screen.findByPlaceholderText(/name@company.com/i);
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 1 Step. About Your Company
  await screen.findByText("About Your Company");
  fireEvent.change(screen.getByPlaceholderText(/company name/i), {
    target: { value: companyName },
  });
  const industryInput = await screen.findByPlaceholderText(/company industry/i);
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });
  fireEvent.change(screen.getByTestId("companyType"), {
    target: { value: companyType },
  });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 2 Step. About Your Requirements
  await screen.findByText("About Your Requirements");
  const skillsInput = await screen.findByPlaceholderText(/select the skills/i);
  fireEvent.click(skillsInput);
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  fireEvent.click(screen.getByLabelText("One to three"));
  fireEvent.change(screen.getByTestId("budget"), { target: { value: budget } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 3 Step. About Your Preferences
  await screen.findByText("About Your Preferences");
  fireEvent.click(screen.getByLabelText("Not Sure"));
  fireEvent.click(screen.getByLabelText("No"));
  fireEvent.click(screen.getByLabelText(/good/i));
  fireEvent.click(screen.getByLabelText("Continue"));
  await screen.findByText("Processing your application");

  // 4 Step. Let's get started
  await screen.findByText(/we think you might/i);
  fireEvent.click(screen.getByLabelText(/call me/i));
  fireEvent.change(await screen.getByPlaceholderText(/contact number/i), {
    target: { value: "123456789" },
  });
  const submitBtn = screen.getByLabelText("Submit");
  fireEvent.click(submitBtn);
  await screen.findByText("Your call is booked");
});

test("hide 'Call Me ASAP' button outside working hours", async () => {
  Settings.now = () => new Date(Date.UTC(2020, 4, 27, 0, 0, 0, 0)).valueOf();
  renderRoute({
    route: "/clients/signup",
    graphQLMocks: [
      ...graphQLMocks,
      mockMutation(
        ABOUT_REQUIREMENTS_UPDATE,
        {
          id: clientApplication.id,
          skills: [skill.name],
          numberOfFreelancers: "1-3",
          budget: Number(budget) * 100,
        },
        {
          updateClientApplication: {
            __typename: "UpdateClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              skills: [skill],
              numberOfFreelancers: "1-3",
              budget,
            },
          },
        },
      ),
      mockMutation(
        SUBMIT_CLIENT_APPLICATION,
        {
          id: clientApplication.id,
          localityImportance,
          acceptedGuaranteeTerms,
          talentQuality,
        },
        {
          submitClientApplication: {
            __typename: "SubmitClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              localityImportance,
              acceptedGuaranteeTerms,
              talentQuality,
              status: "Application Accepted",
              rejectionReason: null,
            },
          },
        },
      ),
    ],
  });

  // 0 Step. Start application
  fireEvent.change(await screen.findByPlaceholderText(/first name/i), {
    target: { value: clientApplication.firstName },
  });
  fireEvent.change(await screen.findByPlaceholderText(/last name/i), {
    target: { value: clientApplication.lastName },
  });
  const emailInput = await screen.findByPlaceholderText(/name@company.com/i);
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 1 Step. About Your Company
  await screen.findByText("About Your Company");
  fireEvent.change(screen.getByPlaceholderText(/company name/i), {
    target: { value: companyName },
  });
  const industryInput = await screen.findByPlaceholderText(/company industry/i);
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });
  fireEvent.change(screen.getByTestId("companyType"), {
    target: { value: companyType },
  });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 2 Step. About Your Requirements
  await screen.findByText("About Your Requirements");
  const skillsInput = await screen.findByPlaceholderText(/select the skills/i);
  fireEvent.click(skillsInput);
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  fireEvent.click(screen.getByLabelText("One to three"));
  fireEvent.change(screen.getByTestId("budget"), { target: { value: budget } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 3 Step. About Your Preferences
  await screen.findByText("About Your Preferences");
  fireEvent.click(screen.getByLabelText("Not Sure"));
  fireEvent.click(screen.getByLabelText("No"));
  fireEvent.click(screen.getByLabelText(/good/i));
  fireEvent.click(screen.getByLabelText("Continue"));
  await screen.findByText("Processing your application");

  // 4 Step. Let's get started
  await screen.findByText(/we think you might/i);
  expect(screen.queryByLabelText(/call me/i)).not.toBeInTheDocument();
});

test("Successful client application flow via query string params", async () => {
  Settings.now = () => new Date(Date.UTC(2020, 4, 27, 16, 0, 0, 0)).valueOf();
  renderRoute({
    route: `/clients/signup?firstName=${clientApplication.firstName}&lastName=${clientApplication.lastName}&email=${email}`,
    graphQLMocks: [
      ...graphQLMocks,
      mockMutation(
        ABOUT_REQUIREMENTS_UPDATE,
        {
          id: clientApplication.id,
          skills: [skill.name],
          numberOfFreelancers: "1-3",
          budget: Number(budget) * 100,
        },
        {
          updateClientApplication: {
            __typename: "UpdateClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              skills: [skill],
              numberOfFreelancers: "1-3",
              budget,
            },
          },
        },
      ),
      mockMutation(
        SUBMIT_CLIENT_APPLICATION,
        {
          id: clientApplication.id,
          localityImportance,
          acceptedGuaranteeTerms,
          talentQuality,
        },
        {
          submitClientApplication: {
            __typename: "SubmitClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              localityImportance,
              acceptedGuaranteeTerms,
              talentQuality,
              status: "Application Accepted",
              rejectionReason: null,
            },
          },
        },
      ),
    ],
  });

  // 1 Step. About Your Company
  await screen.findByText("About Your Company");
  fireEvent.change(screen.getByPlaceholderText(/company name/i), {
    target: { value: companyName },
  });
  const industryInput = await screen.findByPlaceholderText(/company industry/i);
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });
  fireEvent.change(screen.getByTestId("companyType"), {
    target: { value: companyType },
  });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 2 Step. About Your Requirements
  await screen.findByText("About Your Requirements");
  const skillsInput = await screen.findByPlaceholderText(/select the skills/i);
  fireEvent.click(skillsInput);
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  fireEvent.click(screen.getByLabelText("One to three"));
  fireEvent.change(screen.getByTestId("budget"), { target: { value: budget } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 3 Step. About Your Preferences
  await screen.findByText("About Your Preferences");
  fireEvent.click(screen.getByLabelText("Not Sure"));
  fireEvent.click(screen.getByLabelText("No"));
  fireEvent.click(screen.getByLabelText(/good/i));
  fireEvent.click(screen.getByLabelText("Continue"));
  await screen.findByText("Processing your application");

  // 4 Step. Let's get started
  await screen.findByText(/we think you might/i);
  fireEvent.click(screen.getByLabelText(/call me/i));
  fireEvent.change(await screen.getByPlaceholderText(/contact number/i), {
    target: { value: "123456789" },
  });
  const submitBtn = screen.getByLabelText(/submit/i);
  fireEvent.click(submitBtn);
  await screen.findByText("Your call is booked");
});

const emailNotAllowedRejection = {
  request: {
    query: START_CLIENT_APPLICATION,
    variables: {
      input: {
        firstName: clientApplication.firstName,
        lastName: clientApplication.lastName,
        email: "test@gmail.com",
        rid: null,
        utmCampaign: null,
        utmSource: null,
        utmMedium: null,
      },
    },
  },
  result: {
    data: {
      __typename: "Mutation",
      startClientApplication: null,
    },
    errors: [{ extensions: { code: "NON_CORPORATE_EMAIL" } }],
  },
};

test("Reject public gmail for client's signup form via query string params", async () => {
  renderRoute({
    route: `/clients/signup?firstName=${clientApplication.firstName}&lastName=${clientApplication.lastName}&email=test@gmail.com`,
    graphQLMocks: [mockViewer(null), emailNotAllowedRejection],
  });
  await screen.findByText(/personal emails/i);
  fireEvent.click(screen.getByLabelText(/try again/i));
  await screen.findByText(/start your application/i);
});

test("Reject public gmail for client's signup form", async () => {
  renderRoute({
    route: `/clients/signup`,
    graphQLMocks: [mockViewer(null), emailNotAllowedRejection],
  });
  // 0 Step. Start application
  fireEvent.change(await screen.findByPlaceholderText(/first name/i), {
    target: { value: clientApplication.firstName },
  });
  fireEvent.change(await screen.findByPlaceholderText(/last name/i), {
    target: { value: clientApplication.lastName },
  });
  const emailInput = await screen.findByPlaceholderText(/name@company.com/i);
  fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
  fireEvent.click(screen.getByLabelText("Continue"));

  await screen.findByText(/personal emails/i);
});

const accountExistsRejection = {
  request: {
    query: START_CLIENT_APPLICATION,
    variables: {
      input: {
        firstName: clientApplication.firstName,
        lastName: clientApplication.lastName,
        email: "exists@test.com",
        rid: null,
        utmCampaign: null,
        utmSource: null,
        utmMedium: null,
      },
    },
  },
  result: {
    data: {
      __typename: "Mutation",
      startClientApplication: null,
    },
    errors: [{ extensions: { code: "EXISTING_ACCOUNT" } }],
  },
};

test("Account already exists with this email via query string params", async () => {
  renderRoute({
    route: `/clients/signup?firstName=${clientApplication.firstName}&lastName=${clientApplication.lastName}&email=exists@test.com`,
    graphQLMocks: [mockViewer(null), accountExistsRejection],
  });

  await screen.findByText(/welcome back/i);
});

test("Account already exists with this email", async () => {
  renderRoute({
    route: `/clients/signup`,
    graphQLMocks: [mockViewer(null), accountExistsRejection],
  });
  fireEvent.change(await screen.findByPlaceholderText(/first name/i), {
    target: { value: clientApplication.firstName },
  });
  fireEvent.change(await screen.findByPlaceholderText(/last name/i), {
    target: { value: clientApplication.lastName },
  });
  const emailInput = await screen.findByPlaceholderText(/name@company.com/i);
  fireEvent.change(emailInput, { target: { value: "exists@test.com" } });
  fireEvent.click(screen.getByLabelText("Continue"));
  await screen.findByText(/welcome back/i);
});

test("Cheap talents client application rejection flow", async () => {
  renderRoute({
    route: "/clients/signup",
    graphQLMocks: [
      ...graphQLMocks,
      mockMutation(
        ABOUT_REQUIREMENTS_UPDATE,
        {
          id: clientApplication.id,
          skills: [skill.name],
          numberOfFreelancers: "1-3",
          budget: Number(budget) * 100,
        },
        {
          updateClientApplication: {
            __typename: "UpdateClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              skills: [skill],
              numberOfFreelancers: "1-3",
              budget,
            },
          },
        },
      ),
      mockMutation(
        SUBMIT_CLIENT_APPLICATION,
        {
          id: clientApplication.id,
          localityImportance,
          acceptedGuaranteeTerms,
          talentQuality: "CHEAP",
        },
        {
          submitClientApplication: {
            __typename: "SubmitClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              localityImportance,
              acceptedGuaranteeTerms,
              talentQuality: "CHEAP",
              status: "Application Rejected",
              rejectionReason: "CHEAP_TALENT",
            },
          },
        },
      ),
    ],
  });

  // 0 Step. Start application
  fireEvent.change(await screen.findByPlaceholderText(/first name/i), {
    target: { value: clientApplication.firstName },
  });
  fireEvent.change(await screen.findByPlaceholderText(/last name/i), {
    target: { value: clientApplication.lastName },
  });
  const emailInput = await screen.findByPlaceholderText(/name@company.com/i);
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 1 Step. About Your Company
  await screen.findByText("About Your Company");
  fireEvent.change(screen.getByPlaceholderText(/company name/i), {
    target: { value: companyName },
  });
  const industryInput = await screen.findByPlaceholderText(/company industry/i);
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });
  fireEvent.change(screen.getByTestId("companyType"), {
    target: { value: companyType },
  });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 2 Step. About Your Requirements
  await screen.findByText("About Your Requirements");
  const skillsInput = await screen.findByPlaceholderText(/select the skills/i);
  fireEvent.click(skillsInput);
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  fireEvent.click(screen.getByLabelText("One to three"));
  fireEvent.change(screen.getByTestId("budget"), { target: { value: budget } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 3 Step. About Your Preferences
  await screen.findByText("About Your Preferences");
  fireEvent.click(screen.getByLabelText("Not Sure"));
  fireEvent.click(screen.getByLabelText("No"));
  fireEvent.click(screen.getByLabelText(/cheap/i));
  fireEvent.click(screen.getByLabelText("Continue"));
  await screen.findByText("Processing your application");

  // 4 Step. Unfortunately, we're not a good fit
  await screen.findByText(/unfortunately/i);
  await screen.findByLabelText(/upwork/i);
});

test("Reset Cheap Talents rejected flow", async () => {
  renderRoute({
    route: "/clients/signup",
    graphQLMocks: [
      ...graphQLMocks,
      mockMutation(
        RESET_CLIENT_APPLICATION,
        {
          id: clientApplication.id,
        },
        {
          resetClientApplication: {
            __typename: "ResetClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              firstName: clientApplication.firstName,
              lastName: clientApplication.lastName,
              status: "Application Started",
              companyName: null,
              companyType: null,
              industry: null,
              budget: null,
              numberOfFreelancers: null,
              skills: [],
              acceptedGuaranteeTerms: false,
              localityImportance: null,
              rejectionReason: null,
              talentQuality: null,
            },
          },
        },
      ),
      mockMutation(
        ABOUT_REQUIREMENTS_UPDATE,
        {
          id: clientApplication.id,
          skills: [skill.name],
          numberOfFreelancers: "1-3",
          budget: Number(budget) * 100,
        },
        {
          updateClientApplication: {
            __typename: "UpdateClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              skills: [skill],
              numberOfFreelancers: "1-3",
              budget,
            },
          },
        },
      ),
      mockMutation(
        SUBMIT_CLIENT_APPLICATION,
        {
          id: clientApplication.id,
          localityImportance,
          acceptedGuaranteeTerms,
          talentQuality: "CHEAP",
        },
        {
          submitClientApplication: {
            __typename: "SubmitClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              localityImportance,
              acceptedGuaranteeTerms,
              talentQuality: "CHEAP",
              status: "Application Rejected",
              rejectionReason: "CHEAP_TALENT",
            },
          },
        },
      ),
    ],
  });

  // 0 Step. Start application
  fireEvent.change(await screen.findByPlaceholderText(/first name/i), {
    target: { value: clientApplication.firstName },
  });
  fireEvent.change(await screen.findByPlaceholderText(/last name/i), {
    target: { value: clientApplication.lastName },
  });
  const emailInput = await screen.findByPlaceholderText(/name@company.com/i);
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 1 Step. About Your Company
  await screen.findByText("About Your Company");
  fireEvent.change(screen.getByPlaceholderText(/company name/i), {
    target: { value: companyName },
  });
  const industryInput = await screen.findByPlaceholderText(/company industry/i);
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });
  fireEvent.change(screen.getByTestId("companyType"), {
    target: { value: companyType },
  });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 2 Step. About Your Requirements
  await screen.findByText("About Your Requirements");
  const skillsInput = await screen.findByPlaceholderText(/select the skills/i);
  fireEvent.click(skillsInput);
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  fireEvent.click(screen.getByLabelText("One to three"));
  fireEvent.change(screen.getByTestId("budget"), { target: { value: budget } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 3 Step. About Your Preferences
  await screen.findByText("About Your Preferences");
  fireEvent.click(screen.getByLabelText("Not Sure"));
  fireEvent.click(screen.getByLabelText("No"));
  fireEvent.click(screen.getByLabelText(/cheap/i));
  fireEvent.click(screen.getByLabelText("Continue"));
  await screen.findByText("Processing your application");

  // 4 Step. Unfortunately, we're not a good fit
  await screen.findByText(/unfortunately/i);
  await screen.findByLabelText(/upwork/i);
  fireEvent.click(screen.getByLabelText(/try again/i));
  await screen.findByText(/about your company/i);
});

test("Not hiring client application rejection flow", async () => {
  renderRoute({
    route: "/clients/signup",
    graphQLMocks: [
      ...graphQLMocks,
      mockMutation(
        ABOUT_REQUIREMENTS_UPDATE,
        {
          id: clientApplication.id,
          skills: [skill.name],
          numberOfFreelancers: "0",
          budget: Number(budget) * 100,
        },
        {
          updateClientApplication: {
            __typename: "UpdateClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              skills: [skill],
              numberOfFreelancers: "0",
              budget,
            },
          },
        },
      ),
      mockMutation(
        SUBMIT_CLIENT_APPLICATION,
        {
          id: clientApplication.id,
          localityImportance,
          acceptedGuaranteeTerms,
          talentQuality: "GOOD",
        },
        {
          submitClientApplication: {
            __typename: "SubmitClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              localityImportance,
              acceptedGuaranteeTerms,
              talentQuality: "GOOD",
              status: "Application Rejected",
              rejectionReason: "NOT_HIRING",
            },
          },
        },
      ),
      mockMutation(
        REQUEST_APPLICATION_REMINDER,
        {
          id: clientApplication.id,
        },
        {
          requestApplicationReminder: {
            __typename: "RequestApplicationReminderPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              status: "Requested Reminder",
            },
          },
        },
      ),
    ],
  });

  // 0 Step. Start application
  fireEvent.change(await screen.findByPlaceholderText(/first name/i), {
    target: { value: clientApplication.firstName },
  });
  fireEvent.change(await screen.findByPlaceholderText(/last name/i), {
    target: { value: clientApplication.lastName },
  });
  const emailInput = await screen.findByPlaceholderText(/name@company.com/i);
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 1 Step. About Your Company
  await screen.findByText("About Your Company");
  fireEvent.change(screen.getByPlaceholderText(/company name/i), {
    target: { value: companyName },
  });
  const industryInput = await screen.findByPlaceholderText(/company industry/i);
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });
  fireEvent.change(screen.getByTestId("companyType"), {
    target: { value: companyType },
  });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 2 Step. About Your Requirements
  await screen.findByText("About Your Requirements");
  const skillsInput = await screen.findByPlaceholderText(/select the skills/i);
  fireEvent.click(skillsInput);
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  fireEvent.click(screen.getByLabelText("0"));
  fireEvent.change(screen.getByTestId("budget"), { target: { value: budget } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 3 Step. About Your Preferences
  await screen.findByText("About Your Preferences");
  fireEvent.click(screen.getByLabelText("Not Sure"));
  fireEvent.click(screen.getByLabelText("No"));
  fireEvent.click(screen.getByLabelText(/good/i));
  fireEvent.click(screen.getByLabelText("Continue"));
  await screen.findByText("Processing your application");

  // 4 Step. Unfortunately, we're not a good fit
  await screen.findByText(/unfortunately/i);
  await screen.findByText(/hiring/i);
  fireEvent.click(screen.getByLabelText(/remind/i));
  await screen.findByText(/reminder set/i);
});

test("Reset the Not_Hiring rejected flow", async () => {
  renderRoute({
    route: "/clients/signup",
    graphQLMocks: [
      ...graphQLMocks,
      mockMutation(
        RESET_CLIENT_APPLICATION,
        {
          id: clientApplication.id,
        },
        {
          resetClientApplication: {
            __typename: "ResetClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              firstName: clientApplication.firstName,
              lastName: clientApplication.lastName,
              status: "Application Started",
              companyName: null,
              companyType: null,
              industry: null,
              budget: null,
              numberOfFreelancers: null,
              skills: [],
              acceptedGuaranteeTerms: false,
              localityImportance: null,
              rejectionReason: null,
              talentQuality: null,
            },
          },
        },
      ),
      mockMutation(
        ABOUT_REQUIREMENTS_UPDATE,
        {
          id: clientApplication.id,
          skills: [skill.name],
          numberOfFreelancers: "0",
          budget: Number(budget) * 100,
        },
        {
          updateClientApplication: {
            __typename: "UpdateClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              skills: [skill],
              numberOfFreelancers: "0",
              budget,
            },
          },
        },
      ),
      mockMutation(
        SUBMIT_CLIENT_APPLICATION,
        {
          id: clientApplication.id,
          localityImportance,
          acceptedGuaranteeTerms,
          talentQuality: "GOOD",
        },
        {
          submitClientApplication: {
            __typename: "SubmitClientApplicationPayload",
            clientApplication: {
              __typename: "ClientApplication",
              id: clientApplication.id,
              localityImportance,
              acceptedGuaranteeTerms,
              talentQuality: "GOOD",
              status: "Application Rejected",
              rejectionReason: "NOT_HIRING",
            },
          },
        },
      ),
    ],
  });

  // 0 Step. Start application
  fireEvent.change(await screen.findByPlaceholderText(/first name/i), {
    target: { value: clientApplication.firstName },
  });
  fireEvent.change(await screen.findByPlaceholderText(/last name/i), {
    target: { value: clientApplication.lastName },
  });
  const emailInput = await screen.findByPlaceholderText(/name@company.com/i);
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 1 Step. About Your Company
  await screen.findByText("About Your Company");
  fireEvent.change(screen.getByPlaceholderText(/company name/i), {
    target: { value: companyName },
  });
  const industryInput = await screen.findByPlaceholderText(/company industry/i);
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });
  fireEvent.change(screen.getByTestId("companyType"), {
    target: { value: companyType },
  });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 2 Step. About Your Requirements
  await screen.findByText("About Your Requirements");
  const skillsInput = await screen.findByPlaceholderText(/select the skills/i);
  fireEvent.click(skillsInput);
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  fireEvent.click(screen.getByLabelText("0"));
  fireEvent.change(screen.getByTestId("budget"), { target: { value: budget } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 3 Step. About Your Preferences
  await screen.findByText("About Your Preferences");
  fireEvent.click(screen.getByLabelText("Not Sure"));
  fireEvent.click(screen.getByLabelText("No"));
  fireEvent.click(screen.getByLabelText(/good/i));
  fireEvent.click(screen.getByLabelText("Continue"));
  await screen.findByText("Processing your application");

  // 4 Step. Unfortunately, we're not a good fit
  await screen.findByText(/unfortunately/i);
  await screen.findByText(/hiring/i);
  fireEvent.click(screen.getByLabelText(/try again/i));
  await screen.findByText(/about your company/i);
});

test("Calendly's call booked page", async () => {
  renderRoute({
    route: "/clients/signup/thank-you-call-is-booked",
    graphQLMocks: [mockViewer(null)],
  });

  await screen.findByText(/your call is booked/i);
});
