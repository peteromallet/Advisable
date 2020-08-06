import renderApp from "../../../testHelpers/renderApp";
import { fireEvent } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import { GET_SKILLS } from "../Skills";
import GET_SPECIALIST from "../getProfile";
import CREATE_ACCOUNT from "../AccountDetails/createFreelancerAccount";

test("Continues to the confirmation step", async () => {
  const skills = [
    generateTypes.skill({ value: "Marketing", label: "Marketing" }),
  ];

  const { findByPlaceholderText, findByText, getByLabelText } = renderApp({
    route: "/freelancers/signup",
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
          query: GET_SPECIALIST,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
      {
        request: {
          query: GET_SKILLS,
        },
        result: {
          data: {
            skills,
          },
        },
      },
      {
        request: {
          query: CREATE_ACCOUNT,
          variables: {
            input: {
              firstName: "John",
              lastName: "Doe",
              phone: "0861234567",
              email: "john@doe.com",
              password: "testing123",
              skills: ["Marketing"],
              pid: undefined,
              campaignName: undefined,
              campaignSource: undefined,
              referrer: undefined,
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            createFreelancerAccount: {
              __typename: "CreateFreelancerAccountPayload",
              viewer: generateTypes.specialist({
                confirmed: false,
                applicationStage: "Started",
                invitations: [],
              }),
              token: "token1234",
            },
          },
        },
      },
    ],
  });

  const input = await findByPlaceholderText("e.g Online Marketing");
  fireEvent.click(input);
  fireEvent.keyDown(input, { key: "ArrowDown" });
  fireEvent.keyDown(input, { key: "Enter" });
  let button = getByLabelText("Get Started");
  fireEvent.click(button);
  await findByText("Create your account");
  const firstName = await findByPlaceholderText("First name");
  fireEvent.change(firstName, { target: { value: "John" } });
  const lastName = await findByPlaceholderText("Last name");
  fireEvent.change(lastName, { target: { value: "Doe" } });
  const phone = await findByPlaceholderText("Contact number");
  fireEvent.change(phone, { target: { value: "0861234567" } });
  const email = await findByPlaceholderText("Email address");
  fireEvent.change(email, { target: { value: "john@doe.com" } });
  const password = await findByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "testing123" } });
  button = getByLabelText("Continue");
  fireEvent.click(button);
  const header = await findByText("Confirm your account");
  expect(header).toBeInTheDocument();
});
