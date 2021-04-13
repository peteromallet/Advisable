import { renderRoute, mockData } from "test-utils";
import VIEWER from "../../../graphql/queries/getViewer.graphql";
import GET_SETUP_DATA from "../getSetupData";

test("Renders the project type step if payments are setup", async () => {
  let user = mockData.user({
    paymentsSetup: true,
    company: mockData.company(),
    projectPaymentMethod: "Card",
    paymentMethod: {
      __typename: "PaymentMethod",
      last4: "4444",
      brand: "visa",
      expMonth: "05",
      expYear: "2025",
    },
  });

  let project = mockData.project({ projectType: null, user });
  let specialist = mockData.specialist({ firstName: "Dennis" });
  let application = mockData.application({
    status: "Applied",
    id: "rec1234",
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
            currentCompany: mockData.company(),
          },
        },
      },
    ],
  });

  await app.findByText(/how would you like to work with/i);
});
