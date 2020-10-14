import { fireEvent } from "@testing-library/react";
import { renderRoute } from "test-utils";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_PROJECT from "../fetchProject";
import GET_PAYMENT_INTENT from "../Steps/Deposit/getPaymentIntent";
import { GET_DEPOSIT } from "../Steps/Deposit/PaymentPending";

test("User can complete deposit step", async () => {
  let user = generateTypes.user();
  let project = generateTypes.project({
    user: user,
    airtableId: "rec1234",
    status: "Brief Pending Confirmation",
    depositOwed: 25000,
    acceptedTerms: true,
    skills: [],
  });

  const { findByText, findByLabelText } = renderRoute({
    route: "/project_setup/rec1234/deposit",
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
          query: GET_PROJECT,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            project,
          },
        },
      },
      {
        request: {
          query: GET_PAYMENT_INTENT,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            viewer: user,
            project,
          },
        },
      },
      {
        request: {
          query: GET_DEPOSIT,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            project: {
              ...project,
              depositOwed: 0,
            },
          },
        },
      },
    ],
  });

  let cardholder = await findByLabelText("Cardholder Name");
  fireEvent.change(cardholder, { target: { value: "John Doe" } });
  let complete = await findByLabelText("Complete Setup");
  fireEvent.click(complete);
  let text = await findByText("Please wait while", { exact: false });
  expect(text).toBeInTheDocument();
});
