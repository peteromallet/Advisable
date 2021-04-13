import { fireEvent } from "@testing-library/react";
import { renderRoute, mockData } from "test-utils";
import VIEWER from "../../graphql/queries/getViewer.graphql";
import FETCH_DATA from "./fetchData";

test("User can see their active freelancers", async () => {
  const project = mockData.project();
  const application = mockData.application();
  const user = mockData.user();
  const specialist = mockData.specialist({
    name: "John Doe",
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
        query: FETCH_DATA,
      },
      result: {
        data: {
          viewer: {
            ...user,
            applications: [
              {
                ...application,
                specialist,
                project,
                tasks: [],
              },
            ],
          },
        },
      },
    },
  ];

  const app = renderRoute({
    route: "/manage",
    graphQLMocks,
  });

  const header = await app.findByText("John Doe");
  expect(header).toBeInTheDocument();
});

test("User sees an empty state when they have no active talent", async () => {
  const user = mockData.user();

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
        query: FETCH_DATA,
      },
      result: {
        data: {
          viewer: {
            ...user,
            applications: [],
          },
        },
      },
    },
  ];

  const app = renderRoute({
    route: "/manage",
    graphQLMocks,
  });

  const header = await app.findByText(
    "It looks like you haven't hired any freelancers yet.",
    { exact: false },
  );
  expect(header).toBeInTheDocument();
});

test("User can view Finished talent", async () => {
  const project = mockData.project();
  const application = mockData.application({ status: "Stopped Working" });
  const user = mockData.user();
  const specialist = mockData.specialist({
    name: "John Doe",
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
        query: FETCH_DATA,
      },
      result: {
        data: {
          viewer: {
            ...user,
            applications: [
              {
                ...application,
                specialist,
                project,
                tasks: [],
              },
            ],
          },
        },
      },
    },
  ];

  const app = renderRoute({
    route: "/manage",
    graphQLMocks,
  });

  const tab = await app.findByText("Finished");
  let specialistName = app.queryByText("John Doe");
  expect(specialistName).not.toBeVisible();
  fireEvent.click(tab);
  expect(specialistName).toBeVisible();
});
