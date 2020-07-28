import {
  user,
  fireEvent,
  renderRoute,
  screen,
  mockViewer,
  mockData,
  mockQuery,
  mockMutation,
  waitFor,
  waitForElementToBeRemoved,
} from "../../testHelpers/test-utils";

import {
  ABOUT_COMPANY_QUERY,
  GET_CLIENT_APPLICATION,
  START_CLIENT_APPLICATION,
  ABOUT_COMPANY_UPDATE,
  ABOUT_REQUIREMENTS_QUERY,
  ABOUT_REQUIREMENTS_UPDATE,
  SUBMIT_CLIENT_APPLICATION,
  REQUEST_APPLICATION_CALLBACK,
} from "./queries";

test("Successful client application flow and ASAP call", async () => {
  // Mock data
  const skill = mockData.skill();
  const industry = mockData.industry();
  const clientApplication = mockData.clientApplication();
  const email = "test@test.com";
  const companyName = "Test Corp";
  const companyType = "Startup";
  const numberOfFreelancers = "1-3";
  const budget = "10000";
  const localityImportance = 3;
  const acceptedGuaranteeTerms = false;
  const talentQuality = "GOOD";
  const phoneNumber = "+380(93)555-66-99";

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      ABOUT_COMPANY_QUERY,
      { id: clientApplication.id },
      {
        industries: [
          {
            __typename: "Industry",
            label: industry.name,
            value: industry.name,
          },
        ],
        skills: [
          {
            __typename: "Skill",
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
            label: skill.name,
            value: skill.name,
          },
        ],
        clientApplication: {
          ...clientApplication,
          skills: [{ __typename: "Skill", name: skill.name }],
          numberOfFreelancers,
          budget: Number(budget) * 100,
        },
      },
    ),
    mockMutation(
      START_CLIENT_APPLICATION,
      {
        firstName: clientApplication.firstName,
        lastName: clientApplication.lastName,
        email,
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
            industry: {
              __typename: "Industry",
              name: industry.name,
            },
            companyType,
          },
        },
      },
    ),
    mockMutation(
      ABOUT_REQUIREMENTS_UPDATE,
      {
        id: clientApplication.id,
        skills: [skill.name],
        numberOfFreelancers,
        budget: Number(budget) * 100,
      },
      {
        updateClientApplication: {
          __typename: "UpdateClientApplicationPayload",
          clientApplication: {
            __typename: "ClientApplication",
            id: clientApplication.id,
            skills: [{ __typename: "Skill", name: skill.name }],
            numberOfFreelancers,
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
            status: "ACCEPTED",
            rejectionReason: null,
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

  renderRoute({
    route: "/clients/signup",
    graphQLMocks,
  });

  // 0 Step. Start application
  fireEvent.change(await screen.findByPlaceholderText(/First Name/i), {
    target: { value: clientApplication.firstName },
  });
  fireEvent.change(await screen.findByPlaceholderText(/Last Name/i), {
    target: { value: clientApplication.lastName },
  });
  const emailInput = await screen.findByPlaceholderText(
    "ospencer@umbrellacorp.com",
  );
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 1 Step. About Your Company
  await screen.findByText("About Your Company");
  fireEvent.change(screen.getByPlaceholderText("Umbrella Corporation"), {
    target: { value: companyName },
  });
  const industryInput = await screen.findByPlaceholderText("Biotechnology");
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });
  fireEvent.change(screen.getByTestId("companyType"), {
    target: { value: companyType },
  });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 2 Step. About Your Requirements
  await screen.findByText("About Your Requirements");
  const skillsInput = await screen.findByPlaceholderText(
    /Facebook Ads/i,
    {},
    { timeout: 5000 },
  );
  fireEvent.click(skillsInput);
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  fireEvent.change(screen.getByTestId("numberOfFreelancers"), {
    target: { value: numberOfFreelancers },
  });
  fireEvent.change(screen.getByTestId("budget"), { target: { value: budget } });
  fireEvent.click(screen.getByLabelText("Continue"));

  // 3 Step. About Your Preferences
  await screen.findByText("About Your Preferences");
  fireEvent.click(screen.getByLabelText("3"));
  fireEvent.click(screen.getByLabelText(/No/i));
  fireEvent.click(screen.getByLabelText(/good/i));
  fireEvent.click(screen.getByLabelText("Continue"));

  // 4 Step. Let's get started
  await screen.findByText(/Let’s get started/i);
  fireEvent.click(screen.getByLabelText(/call me/i));
  fireEvent.change(await screen.getByPlaceholderText(/contact number/i), {
    target: { value: phoneNumber },
  });
  const submitBtn = screen.getByLabelText(/submit/i);
  fireEvent.click(submitBtn);
  await screen.findByText("Your call is booked");
});
