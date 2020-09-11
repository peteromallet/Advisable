import { Settings } from "luxon";
import { screen, within } from "@testing-library/react";
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
    candidates: [
      mockData.application({
        status: "Application Accepted",
        interview: mockData.interview({
          status: "Call Requested",
          startsAt: null,
        }),
        previousProjects: [mockData.previousProject()],
        specialist: mockData.specialist({
          firstName: "Linda",
          name: "Linda Belcher",
          reviews: [mockData.review()],
        }),
      }),
      mockData.application({
        status: "Interview Scheduled",
        interview: mockData.interview({
          status: "Call Requested",
          startsAt: "2020-06-04T12:00:00.000+02:00",
        }),
        specialist: mockData.specialist({
          firstName: "Gene",
          name: "Gene Belcher",
        }),
      }),
      mockData.application({
        status: "Proposed",
        proposedAt: "2020-06-02T12:00:00.000+02:00",
        projectType: "Fiexed",
        proposalComment: "Hey this is a proposal",
        tasks: [
          mockData.task({ name: "Task one " }),
          mockData.task({ name: "Task two " }),
          mockData.task({ name: "Task three " }),
        ],
        interview: mockData.interview({
          status: "Call Completed",
          startsAt: "2020-06-01T12:00:00.000+02:00",
        }),
        specialist: mockData.specialist({
          firstName: "Jimmy",
          name: "Jimmy Pesto",
        }),
      }),
    ],
  });

  return { project, user };
}

test("Shows searching for candidates indicator", async () => {
  mockBreakpoint("lUp");
  const { project, user } = createTestData();

  project.sourcing = true;
  project.matches = [];

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
    ],
  });

  await screen.findByText(/searching for candidates/i);
});

test("can accept matches", async () => {
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
            interview: mockData.interview({ user }),
            application: {
              ...project.matches[0],
              status: "Application Accepted",
            },
          },
        },
      ),
      mockQuery(queries.GET_CANDIDATES, { id: project.id }, { project }),
      mockMutation(
        queries.REQUEST_INTRODUCTION,
        {
          application: project.matches[1].id,
          availability: user.availability,
        },
        {
          requestIntroduction: {
            __typename: "RequestIntroductionPayload",
            interview: mockData.interview({ user }),
            application: {
              ...project.matches[1],
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
  userEvent.click(await screen.findByLabelText(/accept/i));
  await screen.findByText(/schedule a call with/i);
  userEvent.click(await screen.findByLabelText(/request call/i));
  await screen.findByText(/You have been matched with/i);
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

test("user can see list of candidates", async () => {
  const { project, user } = createTestData();
  mockBreakpoint("lUp");

  renderRoute({
    route: `/projects/${project.id}/candidates`,
    graphQLMocks: [
      mockViewer(user),
      mockQuery(queries.GET_PROJECT, { id: project.id }, { project }),
      mockQuery(queries.GET_CANDIDATES, { id: project.id }, { project }),
    ],
  });

  await screen.findByText(/linda belcher/i);
  await screen.findByText(/gene belcher/i);
});

test("user can view a candidate", async () => {
  const { project, user } = createTestData();
  mockBreakpoint("lUp");

  renderRoute({
    route: `/projects/${project.id}/candidates/${project.candidates[0].id}`,
    graphQLMocks: [
      mockViewer(user),
      mockQuery(queries.GET_PROJECT, { id: project.id }, { project }),
      mockQuery(
        queries.GET_CANDIDATE,
        { id: project.candidates[0].id },
        { application: project.candidates[0] },
      ),
    ],
  });

  await screen.findByText(/linda belcher/i);
  await screen.getByText(project.candidates[0].specialist.reviews[0].comment, {
    exact: false,
  });
  await screen.getByText(project.candidates[0].previousProjects[0].title, {
    exact: false,
  });
});

test("if candidate status is 'Applied' redirects to matches stack", async () => {
  const { project, user } = createTestData();
  mockBreakpoint("lUp");

  renderRoute({
    route: `/projects/${project.id}/candidates/${project.matches[1].id}`,
    graphQLMocks: [
      mockViewer(user),
      mockQuery(queries.GET_PROJECT, { id: project.id }, { project }),
      mockQuery(
        queries.GET_CANDIDATE,
        { id: project.matches[1].id },
        { application: project.matches[1] },
      ),
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
    ],
  });

  await screen.findByText(/tina belcher/i);
});

test("Candidates view has empty state", async () => {
  const { project, user } = createTestData();
  mockBreakpoint("lUp");

  renderRoute({
    route: `/projects/${project.id}/candidates`,
    graphQLMocks: [
      mockViewer(user),
      mockQuery(queries.GET_PROJECT, { id: project.id }, { project }),
      mockQuery(
        queries.GET_CANDIDATES,
        { id: project.id },
        {
          project: {
            ...project,
            candidates: [],
          },
        },
      ),
    ],
  });

  await screen.findByText(/no candidates/i);
});

test("User can view proposal", async () => {
  const { project, user } = createTestData();
  mockBreakpoint("lUp");

  renderRoute({
    route: `/projects/${project.id}/candidates/${project.candidates[2].id}`,
    graphQLMocks: [
      mockViewer(user),
      mockQuery(queries.GET_PROJECT, { id: project.id }, { project }),
      mockQuery(
        queries.GET_CANDIDATE,
        { id: project.candidates[2].id },
        { application: project.candidates[2] },
      ),
      mockQuery(
        queries.GET_PROPOSAL,
        { id: project.candidates[2].id },
        {
          application: project.candidates[2],
        },
      ),
    ],
  });

  await screen.findByText(/jimmy sent you a proposal/i);
  userEvent.click(screen.getByLabelText(/view proposal/i));
  await screen.findByText(/task one/i);
  await screen.findByText(/task two/i);
});
