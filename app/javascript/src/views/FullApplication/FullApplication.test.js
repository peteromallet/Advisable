import user from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import {
  renderRoute,
  mockData,
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/test-utils";
import { GET_APPLICATIONS } from "../Applications/queries";
import { SUBMIT_FULL_APPLICATION } from "./queries";
import { FETCH_PROJECTS } from "../../components/ManagePreviousProjects/queries";

test("User can submit application when 3 projects are validated", async () => {
  const specialist = mockData.specialist({ applicationStage: "On Hold" });

  renderRoute({
    route: "/apply",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        FETCH_PROJECTS,
        {},
        {
          viewer: {
            ...specialist,
            previousProjects: {
              __typename: "PreviousProjectsCollection",
              nodes: [
                mockData.previousProject({
                  title: "Project title here",
                  validationStatus: "Validated",
                }),
                mockData.previousProject({ validationStatus: "Validated" }),
                mockData.previousProject({ validationStatus: "Validated" }),
              ],
            },
          },
        },
      ),
      mockMutation(
        SUBMIT_FULL_APPLICATION,
        {},
        {
          submitFullApplication: {
            __typename: "SubmitFullApplicationPayload",
            specialist: {
              ...specialist,
              applicationStage: "Full Application",
            },
          },
        },
      ),
    ],
  });

  await screen.findByText(/project title here/i);
  const submit = screen.queryByText(/submit application/i);
  user.click(submit);
  await screen.findByText(/We have received your application/i);
});

test("User can not submit application without 3 validated projects", async () => {
  const specialist = mockData.specialist({ applicationStage: "On Hold" });

  renderRoute({
    route: "/apply",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        FETCH_PROJECTS,
        {},
        {
          viewer: {
            ...specialist,
            previousProjects: {
              __typename: "PreviousProjectsCollection",
              nodes: [
                mockData.previousProject({
                  title: "Project title here",
                  validationStatus: "Pending",
                }),
                mockData.previousProject({ validationStatus: "Validated" }),
                mockData.previousProject({ validationStatus: "Validated" }),
              ],
            },
          },
        },
      ),
    ],
  });

  await screen.findByText(/project title here/i);
  const submit = screen.queryByText(/submit application/i);
  expect(submit).toBeNull();
});

test("Renders a different message when application stage is 'Full Application", async () => {
  const specialist = mockData.specialist({
    applicationStage: "Full Application",
  });

  renderRoute({
    route: "/apply",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        FETCH_PROJECTS,
        {},
        {
          viewer: {
            ...specialist,
            previousProjects: {
              __typename: "PreviousProjectsCollection",
              nodes: [
                mockData.previousProject({
                  title: "Project title here",
                  validationStatus: "Pending",
                }),
                mockData.previousProject({ validationStatus: "Validated" }),
                mockData.previousProject({ validationStatus: "Validated" }),
              ],
            },
          },
        },
      ),
    ],
  });

  await screen.findByText(/project title here/i);
  await screen.findByText(/we will be in touch in the coming days/i);
});

test("Complete step redirects to /apply if application stage not 'Full Application'", async () => {
  const specialist = mockData.specialist({
    applicationStage: "On Hold",
  });

  renderRoute({
    route: "/apply/complete",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        FETCH_PROJECTS,
        {},
        {
          viewer: {
            ...specialist,
            previousProjects: {
              __typename: "PreviousProjectsCollection",
              nodes: [
                mockData.previousProject({
                  title: "Project title here",
                }),
              ],
            },
          },
        },
      ),
    ],
  });

  await screen.findByText(/project title here/i);
});

test("Redirects to root path if application stage is 'Accepted'", async () => {
  const specialist = mockData.specialist({
    applicationStage: "Accepted",
  });

  renderRoute({
    route: "/apply/complete",
    graphQLMocks: [
      mockViewer(specialist),
      mockQuery(
        GET_APPLICATIONS,
        {},
        {
          viewer: {
            ...specialist,
            applications: [
              mockData.application({
                status: "Invited To Apply",
                project: mockData.project({
                  primarySkill: "Testing Invites",
                  user: mockData.user(),
                }),
                interview: null,
              }),
            ],
          },
        },
      ),
    ],
  });

  await screen.findByText(/Good news! We found a project/i);
});
