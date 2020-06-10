import React from "react";
import user from "@testing-library/user-event"
import { screen, waitFor } from "@testing-library/react"
import { renderComponent, mockViewer, mockMutation, mockData } from "test-utils";
import Signup from "./index";

import SIGNUP from "./signup.js";

const previousLocation = window.location;

beforeAll(() => {
  delete window.location;
  window.location = {
    href: ""
  }
})

afterAll(() => {
  window.location = previousLocation
})

test("User can signup", async () => {
  renderComponent(<Signup />, {
    route: {
      state: {},
    },
    graphQLMocks: [
      mockViewer(null),
      mockMutation(SIGNUP, {
        email: "test@test.com",
        password: "testing123",
        passwordConfirmation: "testing123"
      }, {
        signup: {
          __typename: "SignupPayload",
          token: "123.456.789",
          errors: []
        }
      })
    ]
  })

  const email = await screen.findByLabelText(/email/i);
  const password = screen.getByLabelText("Password");
  const passwordConfirmation = screen.getByLabelText("Confirm Password");
  user.type(email, "test@test.com")
  user.type(password, "testing123")
  user.type(passwordConfirmation, "testing123")
  user.click(screen.getByLabelText(/signup/i))
  await waitFor(() => expect(window.location.href).toEqual("/"))
})

test("User get's redirected to where they came from", async () => {
  const initialPath = "/testing";
  renderComponent(<Signup />, {
    route: {
      state: {
        from: {
          pathname: initialPath
        }
      },
    },
    graphQLMocks: [
      mockViewer(null),
      mockMutation(SIGNUP, {
        email: "test@test.com",
        password: "testing123",
        passwordConfirmation: "testing123"
      }, {
        signup: {
          __typename: "SignupPayload",
          token: "123.456.789",
          errors: []
        }
      })
    ]
  })

  const email = await screen.findByLabelText(/email/i);
  const password = screen.getByLabelText("Password");
  const passwordConfirmation = screen.getByLabelText("Confirm Password");
  user.type(email, "test@test.com")
  user.type(password, "testing123")
  user.type(passwordConfirmation, "testing123")
  user.click(screen.getByLabelText(/signup/i))
  await waitFor(() => expect(window.location.href).toEqual(initialPath))
})

test("Displays a notice if one is passed", async () => {
  const notice = "notice text"
  renderComponent(<Signup />, {
    route: {
      state: {
        notice
      },
    },
    graphQLMocks: [
      mockViewer(null),
    ]
  })

  await screen.findByText(notice);
})

test("Displays an error if one is returned from API", async () => {
  renderComponent(<Signup />, {
    route: {
      state: {},
    },
    graphQLMocks: [
      mockViewer(null),
      mockMutation(SIGNUP, {
        email: "test@test.com",
        password: "testing123",
        passwordConfirmation: "testing123"
      }, {
        signup: {
          __typename: "SignupPayload",
          token: null,
          errors: [{
            __typename: "Error",
            code: "signupError"
          }]
        }
      })
    ]
  })

  const email = await screen.findByLabelText(/email/i);
  const password = screen.getByLabelText("Password");
  const passwordConfirmation = screen.getByLabelText("Confirm Password");
  user.type(email, "test@test.com")
  user.type(password, "testing123")
  user.type(passwordConfirmation, "testing123")
  user.click(screen.getByLabelText(/signup/i))
  await screen.findByText("errors.signupError")
})

test("can prepopulate the email with query params", async () => {
  renderComponent(<Signup />, {
    route: "/signup?email=test@test.com",
    graphQLMocks: [
      mockViewer(null),
      mockMutation(SIGNUP, {
        email: "test@test.com",
        password: "testing123",
        passwordConfirmation: "testing123"
      }, {
        signup: {
          __typename: "SignupPayload",
          token: null,
          errors: [{
            __typename: "Error",
            code: "signupError"
          }]
        }
      })
    ]
  })

  const email = await screen.findByLabelText("Email")
  expect(email.value).toEqual("test@test.com")
})