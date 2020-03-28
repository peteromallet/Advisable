import { fireEvent, renderRoute, waitForElementToBeRemoved } from "test-utils";
import { mockViewer, mockQuery, mockMutation } from "apolloMocks";
import generateTypes from "../../__mocks__/graphqlFields";
import GET_APPLICATION from "./fetchApplication";
import UPDATE_APPLICATION from "./updateApplication";

test("Rate step continues to the project type step", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    tasks: [],
    project,
    specialist,
  });

  const { findByText, getByLabelText } = renderRoute({
    route: "/applications/rec123/proposal",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(GET_APPLICATION, { id: "rec123" }, { application }),
      mockMutation(
        UPDATE_APPLICATION,
        { id: "rec123", rate: 75 },
        {
          updateApplication: {
            __typename: "UpdateApplicationPayload",
            application: {
              ...application,
              rate: "75",
            },
            errors: null,
          },
        },
      ),
    ],
  });

  await findByText(
    'Proposal for "Testing" with Test Inc',
    {},
    { timeout: 5000 },
  );
  const rate = getByLabelText("Hourly Rate");
  fireEvent.change(rate, { target: { value: "75" } });
  const button = getByLabelText("Continue");
  fireEvent.click(button);
  await waitForElementToBeRemoved(button);
});

test("Project type step continues to the tasks step", async () => {
  const user = generateTypes.user({ companyName: "Test Inc" });
  const project = generateTypes.project({ user, primarySkill: "Testing" });
  const specialist = generateTypes.specialist();
  const application = generateTypes.application({
    id: "rec123",
    airtableId: "rec123",
    status: "Application Accepted",
    rate: "75",
    tasks: [],
    project,
    specialist,
  });

  const { findByText, findByTestId, getByLabelText } = renderRoute({
    route: "/applications/rec123/proposal/type",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(GET_APPLICATION, { id: "rec123" }, { application }),
      mockMutation(
        UPDATE_APPLICATION,
        {
          id: "rec123",
          projectType: "Flexible",
          monthlyLimit: 155,
        },
        {
          updateApplication: {
            __typename: "UpdateApplicationPayload",
            application: {
              ...application,
              projectType: "Flexible",
              monthlyLimit: 155,
            },
            errors: null,
          },
        },
      ),
    ],
  });

  await findByText('Proposal for "Testing" with Test Inc');
  const flexible = await findByTestId("flexible");
  fireEvent.click(flexible);
  const limit = getByLabelText(
    "Set suggested monthly hour cap (to 200-hour max)",
  );
  fireEvent.change(limit, { target: { value: "155" } });
  const accept = getByLabelText("I agree", { exact: false });
  fireEvent.click(accept);
  const cont = getByLabelText("Continue");
  fireEvent.click(cont);
  const el = await findByText("Project Tasks");
  expect(el).toBeInTheDocument();
});
