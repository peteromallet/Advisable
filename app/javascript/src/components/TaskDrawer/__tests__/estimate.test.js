// import React from "react";
import { cleanup, fireEvent, wait } from "@testing-library/react";
// import mockData from "../../../__mocks__/graphqlFields";
// import { renderComponent } from "../../../testHelpers/renderApp";
// import FETCH_TASK from "../../../graphql/queries/taskDetails";
// import UPDATE_ESTIMATE from "../QuoteInput/updateEstimate";
// import TaskDrawer from "../";

afterEach(cleanup);
// jest.setTimeout(10000);

// const user = mockData.user();
// const project = mockData.project({ user });
// const specialist = mockData.specialist();
// const application = mockData.application({ specialist, project });
// const task = mockData.task({
//   name: "This is a test task",
//   application: application,
//   stage: "Not Assigned",
//   estimate: null,
// });

test("Setting the estimate for a task", async () => {
  //   const comp = renderComponent(
  //     <TaskDrawer isClient={false} taskId={task.id} onClose={() => {}} />,
  //     {
  //       route: "/",
  //       graphQLMocks: [
  //         {
  //           request: {
  //             query: FETCH_TASK,
  //             variables: {
  //               id: task.id,
  //             },
  //           },
  //           result: {
  //             data: {
  //               task,
  //             },
  //           },
  //         },
  //         {
  //           request: {
  //             query: UPDATE_ESTIMATE,
  //             variables: {
  //               input: {
  //                 id: task.id,
  //                 estimate: 10,
  //                 estimateType: "Hourly",
  //                 flexibleEstimate: null,
  //               },
  //             },
  //           },
  //           result: {
  //             data: {
  //               __typename: "Mutation",
  //               updateTask: {
  //                 __typename: "UpdateTaskPayload",
  //                 task: {
  //                   ...task,
  //                   estimate: 10,
  //                   estimateType: "Hourly",
  //                   flexibleEstimate: null,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     }
  //   );
  //   const estimateButton = await comp.findByText("Add estimate", {
  //     exact: false,
  //   });
  //   fireEvent.click(estimateButton);
  //   const estimate = await comp.findByPlaceholderText("10 Hours");
  //   fireEvent.change(estimate, { target: { value: "1000" } });
  //   const save = comp.getByLabelText("Save Quote");
  //   fireEvent.click(save);
  //   const label = await comp.findByText("10 hours", { exact: false });
  //   expect(label).toBeInTheDocument();
});
