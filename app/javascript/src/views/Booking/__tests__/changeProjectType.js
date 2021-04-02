import {
  renderRoute,
  fireEvent,
  waitForElementToBeRemoved,
} from "../../../testHelpers/test-utils";
import { mockData, mockViewer, mockQuery, mockMutation } from "test-utils";
import GET_ACTIVE_APPLICATION from "../getActiveApplication";
import UPDATE_PROJECT_TYPE from "../ProjectTypeModal/setProjectType";

test("User can change the project type", async () => {
  let user = mockData.user();
  let project = mockData.project({ user });
  let specialist = mockData.specialist({ firstName: "Dennis" });

  let application = mockData.application({
    project,
    specialist,
    id: "rec1234",
    projectType: "Flexible",
    monthlyLimit: 50,
    status: "Working",
  });

  const graphQLMocks = [
    mockViewer(user),
    mockQuery(
      GET_ACTIVE_APPLICATION,
      { id: "rec1234" },
      { viewer: user, application },
    ),
    mockMutation(
      UPDATE_PROJECT_TYPE,
      {
        application: "rec1234",
        projectType: "Fixed",
        monthlyLimit: 50,
      },
      {
        setTypeForProject: {
          __typename: "SetTypeForProjectPayload",
          application: {
            ...application,
            projectType: "Fixed",
          },
        },
      },
    ),
  ];

  const app = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks,
  });

  const btn = await app.findByLabelText("Edit project type");
  fireEvent.click(btn);
  const fixed = app.getByLabelText("Projects - Predefined Projects", {
    exact: false,
  });
  fireEvent.click(fixed);
  const accept = app.getByLabelText("I accept to be charged", { exact: false });
  fireEvent.click(accept);
  const submit = app.getByLabelText("Update Project Type");
  fireEvent.click(submit);
  await waitForElementToBeRemoved(submit);
  const projectType = await app.findByTestId("projectType");
  expect(projectType).toHaveTextContent("projectTypes.Fixed.label");
});
