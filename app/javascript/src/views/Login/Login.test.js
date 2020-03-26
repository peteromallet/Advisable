import { fireEvent } from "@testing-library/react";
import VIEWER from "../../graphql/queries/viewer";
import renderApp from "../../testHelpers/renderApp";
import mockData from "../../__mocks__/graphqlFields";
import LOGIN from "./login";
import PROJECTS from "../Projects/getProjects";

test("User can login", async () => {
  const user = mockData.user();

  let app = renderApp({
    route: "/login",
    graphQLMocks: [
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
          query: LOGIN,
          variables: {
            input: {
              email: "test@test.com",
              password: "testing123",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            login: {
              __typename: "LoginPayload",
              token: "jwt1234",
              errors: null,
            },
          },
        },
      },
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: user,
          },
        },
      },
      {
        request: {
          query: PROJECTS,
        },
        result: {
          data: {
            viewer: {
              ...user,
              projects: [],
            },
          },
        },
      },
    ],
  });

  let email = await app.findByLabelText("Email Address");
  fireEvent.change(email, { target: { value: "test@test.com" } });
  let password = await app.findByLabelText("Password");
  fireEvent.change(password, { target: { value: "testing123" } });
  let login = await app.findByLabelText("Login");
  fireEvent.click(login);
  await app.findByText("Find a new freelancer");
});

test("User is redirected if already logged in", async () => {
  const user = mockData.user();

  const app = renderApp({
    route: "/login",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: user,
          },
        },
      },
      {
        request: {
          query: PROJECTS,
        },
        result: {
          data: {
            viewer: {
              ...user,
              projects: [],
            },
          },
        },
      },
    ],
  });

  await app.findByText("Find a new freelancer");
});

test("It shows API errors", async () => {
  const app = renderApp({
    route: "/login",
    graphQLMocks: [
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
          query: LOGIN,
          variables: {
            input: {
              email: "test@test.com",
              password: "testing123",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            login: {
              __typename: "LoginPayload",
              token: null,
              errors: [
                {
                  __typename: "Error",
                  code: "emailTaken",
                },
              ],
            },
          },
        },
      },
    ],
  });

  const email = await app.findByLabelText("Email Address");
  fireEvent.change(email, { target: { value: "test@test.com" } });
  const password = await app.findByLabelText("Password");
  fireEvent.change(password, { target: { value: "testing123" } });
  const login = await app.findByLabelText("Login");
  fireEvent.click(login);
  const error = await app.findByText("errors.emailTaken");
  expect(error).toBeInTheDocument();
});
