import { fireEvent } from "@testing-library/react";
import VIEWER from "../../graphql/queries/getViewer.graphql";
import { renderRoute, mockData } from "test-utils";
import LOGIN from "./login";
import { GET_PROJECTS } from "../Projects/queries";

test("User can login", async () => {
  const user = mockData.user({ industry: mockData.industry() });

  let app = renderRoute({
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
              viewer: user,
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
          query: GET_PROJECTS,
        },
        result: {
          data: {
            currentCompany: mockData.company({ projects: [] }),
            viewer: user,
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
  await app.findByText(/projects/i);
});

test("User is redirected if already logged in", async () => {
  const user = mockData.user({ industry: mockData.industry() });

  const app = renderRoute({
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
          query: GET_PROJECTS,
        },
        result: {
          data: {
            currentCompany: mockData.company({ projects: [] }),
            viewer: user,
          },
        },
      },
    ],
  });

  await app.findByText("Find new talent");
});

test("It shows API errors", async () => {
  const app = renderRoute({
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
          errors: [
            {
              extensions: {
                code: "AUTHENTICATION_FAILED",
              },
            },
          ],
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
  const error = await app.findByText(/AUTHENTICATION_FAILED/i);
  expect(error).toBeInTheDocument();
});
