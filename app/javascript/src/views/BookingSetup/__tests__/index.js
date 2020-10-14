import { renderRoute } from "test-utils";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_SETUP_DATA from "../getSetupData";

test("Renders the project type step if payments are setup", async () => {
  let user = generateTypes.user({
    paymentsSetup: true,
    projectPaymentMethod: "Card",
    paymentMethod: {
      __typename: "PaymentMethod",
      last4: "4444",
      brand: "visa",
      expMonth: "05",
      expYear: "2025",
    },
  });

  let project = generateTypes.project({ projectType: null, user });
  let specialist = generateTypes.specialist({ firstName: "Dennis" });
  let application = generateTypes.application({
    status: "Applied",
    airtableId: "rec1234",
    project,
    specialist,
  });

  const app = renderRoute({
    route: "/book/rec1234",
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
          query: GET_SETUP_DATA,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            viewer: user,
            application,
          },
        },
      },
    ],
  });

  let header = await app.findByText("How do you want to", { exact: false });
  expect(header).toBeInTheDocument();
});
