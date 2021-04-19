import { renderRoute, mockData } from "test-utils";
import VIEWER from "../../../graphql/queries/getViewer.graphql";
import GET_SETUP_DATA from "../getSetupData";
import { CREATE_SETUP_INTENT } from "../../../components/UpdatePaymentMethod";

test("Shows form to add card when user has no card", async () => {
  const company = mockData.company();

  let user = mockData.user({
    paymentsSetup: false,
    paymentMethod: null,
    company,
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
            currentCompany: company,
          },
        },
      },
      {
        request: {
          query: CREATE_SETUP_INTENT,
        },
        result: {
          data: {
            __typename: "Mutation",
            createSetupIntent: {
              __typename: "CreateSetupIntentPayload",
              secret: "12345",
            },
          },
        },
      },
    ],
  });

  await app.findByLabelText("Cardholder Name");
});
