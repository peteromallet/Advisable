import { renderRoute, mockData } from "test-utils";
import VIEWER from "../../../graphql/queries/getViewer.graphql";
import GET_ACTIVE_APPLICATION from "../../Booking/getActiveApplication";
import GET_SETUP_DATA from "../getSetupData";

test("User is redirected to booking step when application is already Working", async () => {
  const company = mockData.company();

  let user = mockData.user({
    paymentsSetup: false,
    projectPaymentMethod: null,
    company,
    paymentMethod: {
      __typename: "PaymentMethod",
      last4: "4444",
      brand: "visa",
      expMonth: "05",
      expYear: "2025",
    },
  });

  let project = mockData.project({ projectType: null, user });
  let specialist = mockData.specialist({
    firstName: "Dennis",
    account: mockData.account(),
  });
  let application = mockData.application({
    status: "Working",
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
            currentCompany: company,
          },
        },
      },
      {
        request: {
          query: GET_ACTIVE_APPLICATION,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            viewer: {
              ...user,
            },
            application: {
              ...application,
              status: "Working",
              projectType: "Fixed",
            },
          },
        },
      },
    ],
  });

  const header = await app.findByText("tasks.title");
  expect(header).toBeInTheDocument();
});
