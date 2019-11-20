import renderApp from "../../../testHelpers/renderApp";
import wait from "waait";
import { fireEvent, cleanup } from "@testing-library/react";
import generateTypes from "../../../__mocks__/graphqlFields";
import VIEWER from "../../../graphql/queries/viewer";
import GET_ACTIVE_APPLICATION from "../getActiveApplication";
import UPDATE_PROJECT_TYPE from "../ProjectTypeModal/setProjectType";

afterEach(cleanup);
jest.setTimeout(10000);

test("User can change the project type", async () => {
  let user = generateTypes.user();
  let project = generateTypes.project({ user });
  let specialist = generateTypes.specialist({ firstName: "Dennis" });

  let application = generateTypes.application({
    project,
    specialist,
    airtableId: "rec1234",
    projectType: "Flexible",
    monthlyLimit: 50,
    status: "Working",
  });

  const graphQLMocks = [
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
        query: GET_ACTIVE_APPLICATION,
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
        query: UPDATE_PROJECT_TYPE,
        variables: {
          input: {
            application: "rec1234",
            projectType: "Fixed",
            monthlyLimit: 50,
          },
        },
      },
      result: {
        data: {
          __typename: "MutationPayload",
          setTypeForProject: {
            __typename: "SetTypeForProjectPayload",
            application: {
              ...application,
              projectType: "Fixed",
            },
          },
        },
      },
    },
  ];

  const app = renderApp({
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
  // Not sure why the need for two waits here..
  await wait(0);
  await wait(0);
  const projectType = await app.findByTestId("projectType");
  expect(projectType).toHaveTextContent("projectTypes.Fixed.label");
});
