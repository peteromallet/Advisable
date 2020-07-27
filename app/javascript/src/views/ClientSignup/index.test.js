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
} from "../../testHelpers/test-utils";
import renderApp from "../../testHelpers/renderApp";
import { fireEvient } from "@testing-library/react";

import generateTypes from "../../__mocks__/graphqlFields";

import {
  ABOUT_COMPANY_QUERY,
  GET_CLIENT_APPLICATION,
  START_CLIENT_APPLICATION,
} from "./queries";
import updateApplication from "../ApplicationFlow/updateApplication";
import getApplication from "../ApplicationFlow/fetchApplication";

test("Successful application flow", async () => {
  const skill = generateTypes.skill();
  const industry = generateTypes.industry();
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      ABOUT_COMPANY_QUERY,
      { id: "app_id_001" },
      {
        industries: [
          {
            ...industry,
            label: industry.name,
            value: industry.name,
          },
        ],
        skills: [
          {
            ...skill,
            label: skill.name,
            value: skill.name,
          },
        ],
        clientApplication: {
          id: "app_id_001",
          firstName: "Yurko",
          lastName: "Turskiy",
          companyName: null,
          industry: null,
          companyType: null,
          skills: [],
          numberOfFreelancers: null,
          budget: null,
          localityImportance: null,
          acceptedGuaranteeTerms: false,
          talentQuality: null,
          status: "STARTED",
          rejectionReason: null,
        },
      },
    ),
    mockQuery(
      GET_CLIENT_APPLICATION,
      { id: "app_id_001" },
      {
        clientApplication: {
          id: "app_id_001",
          firstName: "Yurko",
          lastName: "Turskiy",
          companyName: null,
          industry: null,
          companyType: null,
          skills: [],
          numberOfFreelancers: null,
          budget: null,
          localityImportance: null,
          acceptedGuaranteeTerms: false,
          talentQuality: null,
          status: "STARTED",
          rejectionReason: null,
        },
      },
    ),
    mockMutation(
      START_CLIENT_APPLICATION,
      {
        firstName: "Yurko",
        lastName: "Turskiy",
        email: "yurko.turskiy@advisable.com",
      },
      {
        startClientApplication: {
          __typename: "StartClientApplicationPayload",
          clientApplication: {
            __typename: "ClientApplication",
            id: "app_id_001",
            firstName: "Yurko",
            lastName: "Turskiy",
            companyName: null,
            industry: null,
            companyType: null,
            skills: [],
            numberOfFreelancers: null,
            budget: null,
            localityImportance: null,
            acceptedGuaranteeTerms: false,
            talentQuality: null,
            status: "STARTED",
            rejectionReason: null,
          },
        },
      },
    ),
  ];

  const app = renderApp({
    route: "/clients/signup",
    graphQLMocks,
  });

  const firstNameInput = await screen.findByPlaceholderText("First Name");
  fireEvent.change(firstNameInput, { target: { value: "Yurko" } });
  const lastNameInput = await screen.findByPlaceholderText("Last Name");
  fireEvent.change(lastNameInput, { target: { value: "Turskiy" } });
  const emailInput = await screen.findByPlaceholderText(
    "ospencer@umbrellacorp.com",
  );
  fireEvent.change(emailInput, {
    target: { value: "yurko.turskiy@advisable.com" },
  });
  // screen.debug();
  const btn = await screen.findByLabelText("Continue");
  fireEvent.click(btn);
  await app.findByText("About Your Company");
});
