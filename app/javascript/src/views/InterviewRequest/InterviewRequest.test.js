import { Settings, DateTime } from "luxon";
import user from "@testing-library/user-event";
import { fireEvent, screen, within } from "@testing-library/react";
import {
  renderRoute,
  mockViewer,
  mockQuery,
  mockData,
  mockMutation,
} from "../../testHelpers/test-utils";
import {
  FETCH_INTERVIEW,
  ACCEPT_INTERVIEW_REQUEST,
  REQUEST_MORE_TIMES,
} from "./queries";

// Its always 20th may 2020 at midday
Settings.now = () => new Date(2020, 4, 20, 12, 0, 0, 0).valueOf();
Settings.defaultZoneName = "Europe/Berlin";

const times = [
  DateTime.utc().plus({ days: 2 }).set({ hour: 10, minute: 0 }),
  DateTime.utc().plus({ days: 2 }).set({ hour: 10, minute: 30 }),
  DateTime.utc().plus({ days: 2 }).set({ hour: 11, minute: 0 }),
  DateTime.utc().plus({ days: 2 }).set({ hour: 11, minute: 30 }),
  DateTime.utc().plus({ days: 3 }).set({ hour: 10, minute: 0 }),
  DateTime.utc().plus({ days: 3 }).set({ hour: 10, minute: 30 }),
  DateTime.utc().plus({ days: 3 }).set({ hour: 11, minute: 0 }),
  DateTime.utc().plus({ days: 3 }).set({ hour: 11, minute: 30 }),
  DateTime.utc().plus({ days: 4 }).set({ hour: 10, minute: 0 }),
  DateTime.utc().plus({ days: 4 }).set({ hour: 10, minute: 30 }),
  DateTime.utc().plus({ days: 4 }).set({ hour: 11, minute: 0 }),
  DateTime.utc().plus({ days: 4 }).set({ hour: 11, minute: 30 }),
];

test("specialist in Berlin can accept interview request based in new york", async () => {
  const specialist = mockData.specialist();
  const clientUser = mockData.user({
    availability: times.map((t) => t.toISO()),
  });
  const application = mockData.application({ specialist });

  const interview = mockData.interview({
    application,
    user: clientUser,
    status: "Call Requested",
    timeZone: "America/New_York",
  });

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      FETCH_INTERVIEW,
      { id: interview.id },
      {
        interview,
      },
    ),
    mockMutation(
      ACCEPT_INTERVIEW_REQUEST,
      {
        id: interview.id,
        startsAt: times[2].toUTC().toISO(),
        phoneNumber: "0861234567",
      },
      {
        acceptInterviewRequest: {
          __typename: "AcceptInterviewRequestPayload",
          interview: {
            ...interview,
            status: "Call Scheduled",
            startsAt: times[2].toUTC().toISO(),
          },
          errors: null,
        },
      },
    ),
  ];

  renderRoute({
    route: `/interview_request/${interview.id}`,
    graphQLMocks,
  });

  await screen.findByText(/requested a call/i);
  const day = screen.getByText(times[0].toFormat("cccc"), { exact: false });
  user.click(day);
  const timeOption = screen.getByText("13:00 - 13:30");
  user.click(timeOption);
  const number = screen.getByLabelText("Your contact number");
  user.type(number, "0861234567");
  user.click(screen.getByLabelText(/confirm call/i));
  await screen.findByText(/has been scheduled/i);
  expect(screen.getByText("13:00 - 13:30")).toBeInTheDocument();
});

test("Maintains selected time zone", async () => {
  const specialist = mockData.specialist();
  const clientUser = mockData.user({
    availability: times.map((t) => t.toISO()),
  });
  const application = mockData.application({ specialist });

  const interview = mockData.interview({
    application,
    user: clientUser,
    status: "Call Requested",
    timeZone: "America/New_York",
  });

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      FETCH_INTERVIEW,
      { id: interview.id },
      {
        interview,
      },
    ),
    mockMutation(
      ACCEPT_INTERVIEW_REQUEST,
      {
        id: interview.id,
        startsAt: "2020-05-22T10:00:00.000Z",
        phoneNumber: "0861234567",
      },
      {
        acceptInterviewRequest: {
          __typename: "AcceptInterviewRequestPayload",
          interview: {
            ...interview,
            status: "Call Scheduled",
            startsAt: "2020-05-22T10:00:00.000Z",
          },
          errors: null,
        },
      },
    ),
  ];

  renderRoute({
    route: `/interview_request/${interview.id}`,
    graphQLMocks,
  });

  await screen.findByText(/requested a call/i);
  const day = screen.getByText(times[0].toFormat("cccc"), { exact: false });
  user.click(day);

  const berlinTime = "12:00 - 12:30";
  const laTime = "03:00 - 03:30";
  expect(screen.queryByText(berlinTime)).not.toBeNull();
  const timeZoneSelect = screen.getByPlaceholderText("Your Timezone");
  user.click(timeZoneSelect);
  user.type(timeZoneSelect, "America/Los_Angeles");
  fireEvent.keyDown(timeZoneSelect, { key: "ArrowDown" });
  fireEvent.keyDown(timeZoneSelect, { key: "Enter" });
  expect(screen.queryByText(berlinTime)).toBeNull();
  user.click(screen.getByText(laTime));

  const number = screen.getByLabelText("Your contact number");
  user.type(number, "0861234567");
  user.click(screen.getByLabelText(/confirm call/i));

  await screen.findByText(/has been scheduled/i);
  screen.getByText(laTime);
});

test("Scheduled call defaults to viewers timezone", async () => {
  const clientUser = mockData.user();
  const specialist = mockData.specialist();
  const application = mockData.application({ specialist });

  const interview = mockData.interview({
    application,
    user: clientUser,
    timeZone: "America/New_York",
    status: "Call Scheduled",
    startsAt: "2020-05-21T17:00:00.000Z",
  });

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      FETCH_INTERVIEW,
      { id: interview.id },
      {
        interview,
      },
    ),
  ];

  renderRoute({
    route: `/interview_request/${interview.id}`,
    graphQLMocks,
  });

  await screen.findByText(/has been scheduled/i);
  screen.getByText("19:00 - 19:30");
});

test("Can request more time", async () => {
  const specialist = mockData.specialist();
  const clientUser = mockData.user({ availability: [] });
  const application = mockData.application({ specialist });

  const interview = mockData.interview({
    application,
    user: clientUser,
    status: "Call Requested",
  });

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      FETCH_INTERVIEW,
      { id: interview.id },
      {
        interview,
      },
    ),
    mockMutation(
      REQUEST_MORE_TIMES,
      {
        id: interview.id,
        availabilityNote: "I need more time!!",
      },
      {
        requestMoreInterviewTimes: {
          __typename: "RequestMoreInterviewTimesPayload",
          interview: {
            ...interview,
            status: "Need More Time Options",
          },
        },
      },
    ),
  ];

  renderRoute({
    route: `/interview_request/${interview.id}`,
    graphQLMocks,
  });

  await screen.findByText(/requested a call with you/i);
  user.click(screen.getByText(/request more availability/i));
  const modal = within(screen.getByLabelText("Request more availability"));
  const note = modal.getByLabelText(/when suits/i);
  user.type(note, "I need more time!!");
  user.click(modal.getByLabelText(/request/i));
  await screen.findByText(/requested more times/i);
});

test("shows no time when there is no availability", async () => {
  const specialist = mockData.specialist();
  const clientUser = mockData.user({ availability: [] });
  const application = mockData.application({ specialist });

  const interview = mockData.interview({
    application,
    user: clientUser,
    status: "Call Requested",
  });

  const graphQLMocks = [
    mockViewer(specialist),
    mockQuery(
      FETCH_INTERVIEW,
      { id: interview.id },
      {
        interview,
      },
    ),
  ];

  renderRoute({
    route: `/interview_request/${interview.id}`,
    graphQLMocks,
  });

  await screen.findByText(/no more times available/i);
});

test("renders 404 if not found", async () => {
  const specialist = mockData.specialist();

  const graphQLMocks = [
    mockViewer(specialist),
    {
      request: {
        query: FETCH_INTERVIEW,
        variables: { id: "int_123" },
      },
      result: {
        errors: [
          {
            message: "Resouce was not found",
            locations: [
              {
                line: 2,
                column: 3,
              },
            ],
            path: ["interview"],
            extensions: {
              type: "INVALID_REQUEST",
              code: "notFound",
            },
          },
        ],
      },
    },
  ];

  renderRoute({
    route: "/interview_request/int_123",
    graphQLMocks,
  });

  await screen.findByText(/404/i);
});
