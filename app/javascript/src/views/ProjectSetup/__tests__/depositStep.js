import { fireEvent } from "@testing-library/react";
import { renderRoute, mockData as generateTypes } from "test-utils";
import VIEWER from "../../../graphql/queries/viewer";
import GET_PROJECT from "../fetchProject";
import GET_PAYMENT_INTENT from "../Steps/Deposit/getPaymentIntent";
import { GET_DEPOSIT } from "../Steps/Deposit/PaymentPending";
import CONFIRM_PROJECT from "../Steps/SubmitConfirmation/confirmProject.graphql";
import {
  GET_MATCHES,
  GET_PROJECT as VIEW_PROJECT,
} from "../../Project/queries";

test("User can complete deposit step", async () => {
  let user = generateTypes.user({
    salesPerson: generateTypes.salesPerson(),
  });
  let project = generateTypes.project({
    user: user,
    airtableId: "rec1234",
    status: "Brief Pending Confirmation",
    primarySkill: generateTypes.skill(),
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
      {
        request: {
          query: CONFIRM_PROJECT,
          variables: {
            input: {
              id: "rec1234",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            confirmProject: {
              __typename: "ConfirmProjectPayload",
              project: {
                ...project,
                depositOwed: 0,
                status: "Brief Confirmed",
              },
              errors: null,
            },
          },
        },
      },
      {
        request: {
          query: VIEW_PROJECT,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            project: {
              ...project,
              viewerCanAccess: true,
              status: "Brief Confirmed",
              depositOwed: 0,
            },
          },
        },
      },
      {
        request: {
          query: GET_MATCHES,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            viewer: {
              ...user,
              walkthroughComplete: true,
            },
            project: {
              ...project,
              sourcing: true,
              accepted: [],
              matches: [],
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
  await findByText("Please wait while", { exact: false });
  await findByText("Inbox", { exact: false });
});
