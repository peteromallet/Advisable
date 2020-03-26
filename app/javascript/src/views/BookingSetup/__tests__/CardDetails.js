import renderApp from "../../../testHelpers/renderApp";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_SETUP_DATA from "../getSetupData";
import { GET_PAYMENT_METHOD } from "../CardDetails";
import { CREATE_SETUP_INTENT } from "../../../components/UpdatePaymentMethod";

jest.setTimeout(10000);

test("Shows form to add card when user has no card", async () => {
  let user = generateTypes.user({
    paymentsSetup: false,
    projectPaymentMethod: "Card",
    paymentMethod: null,
  });

  let project = generateTypes.project({ projectType: null, user });
  let specialist = generateTypes.specialist({ firstName: "Dennis" });
  let application = generateTypes.application({
    status: "Applied",
    airtableId: "rec1234",
    project,
    specialist,
  });

  const app = renderApp({
    route: "/book/rec1234/card_details",
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
      {
        request: {
          query: GET_PAYMENT_METHOD,
        },
        result: {
          data: {
            viewer: user,
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

  await app.findByText("Add payment method");
  const cardHolder = await app.findByLabelText("Cardholder Name");
  expect(cardHolder).toBeInTheDocument();
});
