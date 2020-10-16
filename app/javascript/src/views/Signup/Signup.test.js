import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import {
  renderComponent,
  renderRoute,
  mockQuery,
  mockViewer,
  mockMutation,
  mockData,
} from "test-utils";
import Signup from "./index";
import SIGNUP from "./signup";
import { GET_PROJECTS } from "../Projects/queries";

const previousLocation = window.location;

beforeAll(() => {
  delete window.location;
  window.location = {
    href: "",
  };
});

afterAll(() => {
  window.location = previousLocation;
});

test("User can signup", async () => {
  const user = mockData.user();

  renderRoute({
    route: `/signup/${user.id}`,
    graphQLMocks: [
      mockViewer(null),
      mockMutation(
        SIGNUP,
        {
          id: user.id,
          email: "test@test.com",
          password: "testing123",
          passwordConfirmation: "testing123",
        },
        {
          signup: {
            __typename: "SignupPayload",
            viewer: user,
          },
        },
      ),
      mockViewer(user),
      mockQuery(
        GET_PROJECTS,
        {},
        {
          viewer: {
            ...user,
            industry: mockData.industry(),
            projects: [],
          },
        },
      ),
    ],
  });

  const email = await screen.findByLabelText(/email/i);
  const password = screen.getByLabelText("Password");
  const passwordConfirmation = screen.getByLabelText("Confirm Password");
  userEvent.type(email, "test@test.com");
  userEvent.type(password, "testing123");
  userEvent.type(passwordConfirmation, "testing123");
  userEvent.click(screen.getByLabelText(/signup/i));
  await screen.findByText(/projects/i);
});

test("Displays a notice if one is passed", async () => {
  const notice = "notice text";
  renderComponent(<Signup />, {
    route: {
      state: {
        notice,
      },
    },
    graphQLMocks: [mockViewer(null)],
  });

  await screen.findByText(notice);
});

test("Displays an error if one is returned from API", async () => {
  renderComponent(<Signup />, {
    route: {
      state: {},
    },
    graphQLMocks: [
      mockViewer(null),
      {
        request: {
          query: SIGNUP,
          variables: {
            input: {
              email: "test@test.com",
              password: "testing123",
              passwordConfirmation: "testing123",
            },
          },
        },
        result: {
          errors: [
            {
              extensions: {
                code: "SIGNUP_FAILED",
              },
            },
          ],
        },
      },
    ],
  });

  const email = await screen.findByLabelText(/email/i);
  const password = screen.getByLabelText("Password");
  const passwordConfirmation = screen.getByLabelText("Confirm Password");
  userEvent.type(email, "test@test.com");
  userEvent.type(password, "testing123");
  userEvent.type(passwordConfirmation, "testing123");
  userEvent.click(screen.getByLabelText(/signup/i));
  await screen.findByText(/SIGNUP_FAILED/i);
});

test("can prepopulate the email with query params", async () => {
  renderComponent(<Signup />, {
    route: "/signup?email=test@test.com",
    graphQLMocks: [mockViewer(null)],
  });

  const email = await screen.findByLabelText("Email");
  expect(email.value).toEqual("test@test.com");
});
