import Cookies from "js-cookie";
import { fireEvent, cleanup } from "@testing-library/react";
import wait from "waait";
import renderApp from "../../../testHelpers/renderApp";
import VIEWER from "../../../graphql/queries/viewer";
import LOGIN from "../login";

afterEach(cleanup);

jest.mock("js-cookie", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

test("User can login", async () => {
  let { findByLabelText } = renderApp({
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
    ],
  });

  let email = await findByLabelText("Email");
  fireEvent.change(email, { target: { value: "test@test.com" } });
  let password = await findByLabelText("Password");
  fireEvent.change(password, { target: { value: "testing123" } });
  let login = await findByLabelText("Login");
  fireEvent.click(login);
  await wait(1000);
  expect(Cookies.set).toHaveBeenCalledWith("authToken", "jwt1234");
});
