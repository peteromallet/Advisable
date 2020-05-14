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
} from "test-utils";
import {
  GET_PREVIOUS_PROJECT,
  VALIDATE_PREVIOUS_PROJECT,
  FAIL_PREVIOUS_PROJECT_VALIDATION,
  REVIEW_PREVIOUS_PROJECT,
  CREATE_USER_FROM_PROJECT_VERIFICATION,
} from "../queries";

import { alphanumeric } from "../../../utilities/generateID";

jest.mock("../../../utilities/generateID");

beforeEach(() => {
  alphanumeric.mockClear();
});

test("Prompts to authenticate via linkedin", async () => {
  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: null,
        previousProject: mockData.previousProject({
          id: "pre_1",
          specialist: mockData.specialist(),
        }),
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1",
    graphQLMocks,
  });

  const btn = await screen.findByText("Login with Linkedin");
  expect(btn).toBeInTheDocument();
});

test("Shows notice to reauth if viewer cant validate", async () => {
  const previousProject = mockData.previousProject({
    id: "pre_1",
    specialist: mockData.specialist(),
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: {
          __typename: "oauthViewer",
          name: "Test Account",
          image: null,
          firstName: "Test",
          canValidateProject: false,
        },
        previousProject,
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1",
    graphQLMocks,
  });

  await screen.findByText("Unable to validate project");
});

test("Can validate project", async () => {
  const previousProject = mockData.previousProject({
    id: "pre_1",
    specialist: mockData.specialist(),
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: {
          __typename: "oauthViewer",
          name: "Test Account",
          image: null,
          firstName: "Test",
          canValidateProject: true,
        },
        previousProject,
      },
    ),
    mockMutation(
      VALIDATE_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        verifyPreviousProject: {
          __typename: "VerifyPreviousProjectPayload",
          previousProject: {
            ...previousProject,
            validationStatus: "Validated",
          },
        },
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1",
    graphQLMocks,
  });

  const btn = await screen.findByLabelText("Verify Project");
  user.click(btn);
  await screen.findByText(/How was your experience/i);
});

test("Can fail project validation", async () => {
  const previousProject = mockData.previousProject({
    id: "pre_1",
    specialist: mockData.specialist(),
    primaryIndustry: mockData.industry(),
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: {
          __typename: "oauthViewer",
          name: "Test Account",
          image: null,
          firstName: "Test",
          canValidateProject: true,
        },
        previousProject,
      },
    ),
    mockMutation(
      FAIL_PREVIOUS_PROJECT_VALIDATION,
      { previousProject: "pre_1", reason: "This is the reason" },
      {
        failPreviousProjectVerification: {
          __typename: "FailedPreviousProjectVerificationPayload",
          previousProject: {
            ...previousProject,
            validationStatus: "Validation Failed",
          },
        },
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1",
    graphQLMocks,
  });

  const btn = await screen.findByLabelText(/I can't verify/i);
  user.click(btn);
  const input = await screen.findByPlaceholderText("Reason");
  user.type(input, "This is the reason");
  user.click(screen.getByLabelText("Continue"));
  await screen.findByText(/Thanks/i);
});

test("Can leave a review", async () => {
  const previousProject = mockData.previousProject({
    id: "pre_1",
    specialist: mockData.specialist(),
    primaryIndustry: mockData.industry(),
    validationStatus: "Validated",
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: {
          __typename: "oauthViewer",
          name: "Test Account",
          image: null,
          firstName: "Test",
          canValidateProject: true,
        },
        previousProject,
      },
    ),
    mockMutation(
      REVIEW_PREVIOUS_PROJECT,
      {
        previousProject: "pre_1",
        comment: "This is the comment",
        skills: 5,
        qualityOfWork: 4,
        adherenceToSchedule: 3,
        communication: 2,
        availability: 1,
      },
      {
        reviewPreviousProject: {
          __typename: "ReviewPreviousProjectPayload",
          review: mockData.review(),
        },
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1/review",
    graphQLMocks,
  });

  await screen.findByText(/How was your experience/i);
  user.click(screen.getByLabelText(/rate skills 5 stars/i));
  user.click(screen.getByLabelText(/rate quality of work 4 stars/i));
  user.click(screen.getByLabelText(/rate adherence to schedule 3 stars/i));
  user.click(screen.getByLabelText(/rate communication 2 stars/i));
  user.click(screen.getByLabelText(/rate availability 1 star/i));
  user.type(
    screen.getByLabelText("Anything else you would like to add?"),
    "This is the comment",
  );
  user.click(screen.getByLabelText("Continue"));
  await screen.findByText(/Thanks/i);
});

test("Can skip leaving a review", async () => {
  const previousProject = mockData.previousProject({
    id: "pre_1",
    specialist: mockData.specialist(),
    primaryIndustry: mockData.industry(),
    validationStatus: "Validated",
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: {
          __typename: "oauthViewer",
          name: "Test Account",
          image: null,
          firstName: "Test",
          canValidateProject: true,
        },
        previousProject,
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1/review",
    graphQLMocks,
  });

  await screen.findByText(/How was your experience/i);
  user.click(screen.getByLabelText(/skip/i));
  await screen.findByText(/Thanks/i);
});

test("Can signup for advisable", async () => {
  alphanumeric.mockReturnValue("fid1234");
  global.window = Object.create(window);
  Object.defineProperty(window, "location", {
    value: {
      href: "",
    },
  });

  const previousProject = mockData.previousProject({
    id: "pre_1",
    specialist: mockData.specialist(),
    primaryIndustry: mockData.industry(),
    validationStatus: "Validated",
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: {
          __typename: "oauthViewer",
          name: "Test Account",
          image: null,
          firstName: "Test",
          canValidateProject: true,
        },
        previousProject,
      },
    ),
    mockMutation(
      CREATE_USER_FROM_PROJECT_VERIFICATION,
      {
        fid: "fid1234",
        previousProject: "pre_1",
        email: "test@test.com",
      },
      {
        createUserFromProjectVerification: {
          __typename: "CreateUserFromProjectVerificationPayload",
          user: mockData.user({
            firstName: "Test",
            lastNane: "Account",
            companyName: "TestingInc",
            companyType: "Startup",
            industry: mockData.industry({
              name: "Testing",
            }),
          }),
        },
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1/complete",
    graphQLMocks,
  });

  await screen.findByText(/thanks/i);
  const email = screen.getByPlaceholderText("Email address");
  user.type(email, "test@test.com");
  const btn = screen.getByLabelText(/Get Started/i);
  user.click(btn);
  await waitFor(() => expect(btn).toHaveAttribute("data-loading", "false"));

  expect(window.location.href).toEqual(
    `https://advisable.com/clients/signup?fid=fid1234&fn=Test&ln=Accountshow_contact_page=0&email=test@test.com&field90540872=TestingInc&field90540873=Testing&field90540874=Startup`,
  );
});

test("Redirects to /validated if already has a review", async () => {
  const previousProject = mockData.previousProject({
    id: "pre_1",
    specialist: mockData.specialist(),
    primaryIndustry: mockData.industry(),
    validationStatus: "Validated",
    reviews: [mockData.review()],
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: {
          __typename: "oauthViewer",
          name: "Test Account",
          image: null,
          firstName: "Test",
          canValidateProject: true,
        },
        previousProject,
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1/review",
    graphQLMocks,
  });

  await screen.findByText(/Thanks/i);
});

test("Displays already validated when not oauthed", async () => {
  const previousProject = mockData.previousProject({
    id: "pre_1",
    specialist: mockData.specialist(),
    primaryIndustry: mockData.industry(),
    validationStatus: "Validated",
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: null,
        previousProject,
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1",
    graphQLMocks,
  });

  await screen.findByText(/project validated/i);
});

test("Prompts to auth with linkedin when failed", async () => {
  const previousProject = mockData.previousProject({
    id: "pre_1",
    specialist: mockData.specialist(),
    primaryIndustry: mockData.industry(),
    validationStatus: "Validation Failed",
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: null,
        previousProject,
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1",
    graphQLMocks,
  });

  await screen.findByText("Login with Linkedin");
});

test("Can still validate project when its failed", async () => {
  const previousProject = mockData.previousProject({
    id: "pre_1",
    specialist: mockData.specialist(),
    primaryIndustry: mockData.industry(),
    validationStatus: "Validation Failed",
  });

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        oauthViewer: {
          __typename: "oauthViewer",
          name: "Test Account",
          image: null,
          firstName: "Test",
          canValidateProject: true,
        },
        previousProject,
      },
    ),
    mockMutation(
      VALIDATE_PREVIOUS_PROJECT,
      { id: "pre_1" },
      {
        verifyPreviousProject: {
          __typename: "VerifyPreviousProjectPayload",
          previousProject: {
            ...previousProject,
            validationStatus: "Validation Failed",
          },
        },
      },
    ),
  ];

  renderRoute({
    route: "/verify_project/pre_1",
    graphQLMocks,
  });

  const btn = await screen.findByLabelText("Verify Project");
  user.click(btn);
  await screen.findByText(/How was your experience/i);
});

test("Render not found when API return not found", async () => {
  const graphQLMocks = [
    mockViewer(null),
    {
      request: {
        query: GET_PREVIOUS_PROJECT,
        variables: {
          id: "pre_1",
        },
      },
      result: {
        errors: [
          {
            message: "Resouce was not found",
            path: ["previousProject"],
            extensions: {
              type: "INVALID_REQUEST",
              code: "notFound",
            },
          },
        ],
      },
    },
  ];

  renderRoute({
    route: "/verify_project/pre_1",
    graphQLMocks,
  });

  await screen.findByText("Not Found");
});
