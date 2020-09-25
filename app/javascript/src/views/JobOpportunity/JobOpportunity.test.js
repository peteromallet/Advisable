import { screen } from "@testing-library/react";
import {
  renderRoute,
  fireEvent,
  mockViewer,
  mockQuery,
  mockData,
  mockMutation,
} from "../../testHelpers/test-utils";
import { GET_PROJECT, APPLY_FOR_PROJECT } from "./queries";
import { fetchApplication as GET_APPLICATION } from "../ApplicationFlow/queries";

const specialist = mockData.specialist();

test("Renders the view for a project", async () => {
  renderRoute({
    route: "/opportunities/rec1234",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        GET_PROJECT,
        { id: "rec1234" },
        {
          project: mockData.project({
            id: "rec1234",
            user: mockData.user({
              country: mockData.country(),
            }),
          }),
        },
      ),
      mockQuery(
        GET_APPLICATION,
        { id: "app1234" },
        {
          application: mockData.application({
            status: "Applied",
            specialist: specialist,
            project: mockData.project({
              applicationsOpen: true,
              user: mockData.user({
                country: mockData.country(),
              }),
            }),
          }),
        },
      ),
      mockMutation(
        APPLY_FOR_PROJECT,
        { project: "rec1234" },
        {
          applyForProject: {
            __typename: "ApplyForProjectPayload",
            application: {
              __typename: "Application",
              id: "app1234",
            },
          },
        },
      ),
    ],
  });

  await screen.findByText(/you have been invited/i);
  fireEvent.click(screen.getByLabelText("Apply"));
  await screen.findByText(/description of your background/i);
});
