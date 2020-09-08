import { Settings } from "luxon";
import { screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  renderRoute,
  mockData,
  mockViewer,
  mockQuery,
  mockMutation,
  mockBreakpoint,
} from "../../testHelpers/test-utils";
import * as queries from "./queries";

// Its always 27th may 2020 at midday
Settings.now = () => new Date(2020, 4, 27, 12, 0, 0, 0).valueOf();

function createTestData() {
  const primarySkill = mockData.skill();
  const salesPerson = mockData.salesPerson();
  const user = mockData.user({
    salesPerson,
    availability: [
      "2020-06-02T10:00:00.000+02:00",
      "2020-06-02T10:30:00.000+02:00",
      "2020-06-03T10:00:00.000+02:00",
      "2020-06-03T10:30:00.000+02:00",
      "2020-06-04T10:00:00.000+02:00",
      "2020-06-04T10:30:00.000+02:00",
      "2020-06-05T10:00:00.000+02:00",
      "2020-06-05T10:30:00.000+02:00",
    ],
  });
  const project = mockData.project({
    user,
    primarySkill,
    accepted: [],
    sourcing: true,
    status: "Brief Confirmed",
    candidates: [],
    matches: [
      mockData.application({
        status: "Applied",
        specialist: mockData.specialist({
          firstName: "Bob",
          name: "Bob Belcher",
        }),
      }),
      mockData.application({
        status: "Applied",
        specialist: mockData.specialist({
          firstName: "Tina",
          name: "Tina Belcher",
        }),
      }),
    ],
  });

  return { project, user };
}

test("can accept a match", async () => {
  mockBreakpoint("lUp");
  const { project, user } = createTestData();

  renderRoute({
    route: `/projects/${project.id}`,
    graphQLMocks: [
      mockViewer(user),
      mockQuery(queries.GET_PROJECT, { id: project.id }, { project }),
      mockQuery(
        queries.GET_MATCHES,
        { id: project.id },
        {
          project,
          viewer: {
            ...user,
            walkthroughComplete: true,
          },
        },
      ),
      mockQuery(
        queries.GET_AVAILABILITY,
        {},
        {
          viewer: {
            ...user,
            interviews: [],
          },
        },
      ),
      mockMutation(
        queries.REQUEST_INTRODUCTION,
        {
          application: project.matches[0].id,
          availability: user.availability,
        },
        {
          requestIntroduction: {
            __typename: "RequestIntroductionPayload",
            application: {
              ...project.matches[0],
              status: "Application Accepted",
            },
          },
        },
      ),
      mockQuery(queries.GET_CANDIDATES, { id: project.id }, { project }),
    ],
  });

  await screen.findByText(/bob belcher/i);
  userEvent.click(await screen.findByLabelText(/accept/i));
  await screen.findByText(/schedule a call with/i);
  userEvent.click(await screen.findByLabelText(/request call/i));
  await screen.findByText(/tina belcher/i);
});

test("can reject a match", async () => {
  const { project, user } = createTestData();
  mockBreakpoint("lUp");

  renderRoute({
    route: `/projects/${project.id}/matches`,
    graphQLMocks: [
      mockViewer(user),
      mockQuery(queries.GET_PROJECT, { id: project.id }, { project }),
      mockQuery(
        queries.GET_MATCHES,
        { id: project.id },
        {
          project,
          viewer: {
            ...user,
            walkthroughComplete: true,
          },
        },
      ),
      mockMutation(
        queries.REJECT_APPLICATION,
        {
          id: project.matches[0].id,
          reason: "I want someone with more relevant experience",
          comment: "",
        },
        {
          rejectApplication: {
            __typename: "RejectApplicationPayload",
            application: {
              ...project.matches[0],
              status: "Application Rejected",
            },
          },
        },
      ),
    ],
  });

  await screen.findByText(/bob belcher/i);
  const actionBar = await screen.findByTestId("actionBar");
  userEvent.click(await within(actionBar).findByLabelText(/reject/i));
  await screen.findByText(/please provide feedback to/i);
  const modal = await screen.findByLabelText(/reject bob/i);
  const rejectBtn = await within(modal).findByRole("button", {
    name: /reject/i,
  });
  userEvent.click(rejectBtn);
  await screen.findByText(/tina belcher/i);
});
