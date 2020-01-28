import { cleanup, fireEvent } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import mock from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import FETCH_DATA from "./fetchData";

afterEach(cleanup)

test("User can see their active freelancers", async () => {
  const project = mock.project();
  const application = mock.application()
  const user = mock.user()
  const specialist = mock.specialist({
    name: "John Doe"
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
          applications: [{
            ...application,
            specialist,
            project,
            tasks: []
          }]
        }
      }
    }
  }]

  const app = renderApp({
    route: "/manage",
    graphQLMocks
  })

  const header = await app.findByText("John Doe")
  expect(header).toBeInTheDocument()
})

test("User sees an empty state when they have no active talent", async() => {
  const project = mock.project();
  const application = mock.application()
  const user = mock.user()
  const specialist = mock.specialist({
    name: "John Doe"
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
          applications: []
        }
      }
    }
  }]

  const app = renderApp({
    route: "/manage",
    graphQLMocks
  })

  const header = await app.findByText("It looks like you haven't hired any freelancers yet.", { exact: false })
  expect(header).toBeInTheDocument()
})

test("User can view Finished talent", async() => {
  const project = mock.project();
  const application = mock.application({ status: "Stopped Working"})
  const user = mock.user()
  const specialist = mock.specialist({
    name: "John Doe"
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
          applications: [{
            ...application,
            specialist,
            project,
            tasks: []
          }]
        }
      }
    }
  }]

  const app = renderApp({
    route: "/manage",
    graphQLMocks
  })

  const tab = await app.findByText("Finished");
  let specialistName = app.queryByText("John Doe")
  expect(specialistName).not.toBeVisible()
  fireEvent.click(tab)
  expect(specialistName).toBeVisible()
})

