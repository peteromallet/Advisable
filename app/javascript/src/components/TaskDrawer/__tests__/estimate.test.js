import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import mockData from "../../../__mocks__/graphqlFields";
import { renderComponent } from "../../../testHelpers/renderApp";
import FETCH_TASK from "../../../graphql/queries/taskDetails";
import UPDATE_ESTIMATE from "../QuoteInput/updateEstimate";
import TaskDrawer from "../";

const user = mockData.user();
const project = mockData.project({ user });
const specialist = mockData.specialist();
const application = mockData.application({ specialist, project });
const task = mockData.task({
  name: "This is a test task",
  application: application,
  stage: "Not Assigned",
  estimate: null,
});

test("Setting the estimate for a task", async () => {
  const graphQLMocks = [
    {
      request: {
        query: FETCH_TASK,
        variables: {
          id: task.id,
        },
      },
      result: {
        data: {
          task,
        },
      },
    },
    {
      request: {
        query: UPDATE_ESTIMATE,
        variables: {
          input: {
            id: task.id,
            estimate: 10,
            estimateType: "Hourly",
            flexibleEstimate: 20,
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          updateTask: {
            __typename: "UpdateTaskPayload",
            task: {
              ...task,
              estimate: 10,
              estimateType: "Hourly",
              flexibleEstimate: 20,
            },
          },
        },
      },
    },
  ];

  const comp = renderComponent(
    <TaskDrawer isClient={false} taskId={task.id} onClose={() => {}} />,
    {
      route: "/",
      graphQLMocks,
    }
  );
  const estimateButton = await comp.findByText("Add estimate", {
    exact: false,
  });
  fireEvent.click(estimateButton);
  const flexible = comp.getByLabelText("Flexible", { exact: false });
  fireEvent.click(flexible);
  const estimate = await comp.findByPlaceholderText("10 Hours");
  fireEvent.change(estimate, { target: { value: "10" } });
  const flexibleEstimate = comp.getByPlaceholderText("20 Hours");
  fireEvent.change(flexibleEstimate, { target: { value: "20" } });
  await waitFor(() => {}); // wait for validations to finish!
  const save = comp.getByLabelText("Save Quote");
  fireEvent.click(save);
  const label = await comp.findByText("10 - 20 hours", { exact: false });
  expect(label).toBeInTheDocument();
});

test("Setting a fixed price estimate", async () => {
  const graphQLMocks = [
    {
      request: {
        query: FETCH_TASK,
        variables: {
          id: task.id,
        },
      },
      result: {
        data: {
          task,
        },
      },
    },
    {
      request: {
        query: UPDATE_ESTIMATE,
        variables: {
          input: {
            id: task.id,
            estimate: 10000,
            estimateType: "Fixed",
            flexibleEstimate: 20000,
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          updateTask: {
            __typename: "UpdateTaskPayload",
            task: {
              ...task,
              estimate: 10000,
              estimateType: "Fixed",
              flexibleEstimate: 20000,
            },
          },
        },
      },
    },
  ];

  const comp = renderComponent(
    <TaskDrawer isClient={false} taskId={task.id} onClose={() => {}} />,
    {
      route: "/",
      graphQLMocks,
    }
  );

  const estimateButton = await comp.findByText("Add estimate", {
    exact: false,
  });
  fireEvent.click(estimateButton);
  const fixed = await comp.findByText("Fixed");
  fireEvent.click(fixed);
  const flexible = comp.getByLabelText("Flexible", { exact: false });
  fireEvent.click(flexible);
  const estimate = await comp.findByPlaceholderText("500");
  fireEvent.change(estimate, { target: { value: "100" } });
  const flexibleEstimate = comp.getByPlaceholderText("1000");
  fireEvent.change(flexibleEstimate, { target: { value: "200" } });
  await waitFor(() => {}); // wait for validations to finish!
  const save = comp.getByLabelText("Save Quote");
  fireEvent.click(save);
  const label = await comp.findByText("$100 - $200", { exact: false });
  expect(label).toBeInTheDocument();
});

test("Can switch from flexible estimate to strit", async () => {
  const graphQLMocks = [
    {
      request: {
        query: FETCH_TASK,
        variables: {
          id: task.id,
        },
      },
      result: {
        data: {
          task: {
            ...task,
            estimate: 10,
            flexibleEstimate: 20,
            estimateType: "Hourly",
          },
        },
      },
    },
    {
      request: {
        query: UPDATE_ESTIMATE,
        variables: {
          input: {
            id: task.id,
            estimate: 10,
            estimateType: "Hourly",
            flexibleEstimate: null,
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          updateTask: {
            __typename: "UpdateTaskPayload",
            task: {
              ...task,
              estimate: 10,
              estimateType: "Hourly",
              flexibleEstimate: null,
            },
          },
        },
      },
    },
  ];

  const comp = renderComponent(
    <TaskDrawer isClient={false} taskId={task.id} onClose={() => {}} />,
    {
      route: "/",
      graphQLMocks,
    }
  );

  const estimateButton = await comp.findByLabelText("Set estimate");
  fireEvent.click(estimateButton);
  const flexible = comp.getByLabelText("Flexible hours");
  fireEvent.click(flexible);
  await waitFor(() => {}); // wait for validations to finish!
  const save = comp.getByLabelText("Save Quote");
  fireEvent.click(save);
  const label = await comp.findByText("10 hours", { exact: false });
  expect(label).toBeInTheDocument();
});
