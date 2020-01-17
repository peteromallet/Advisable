import moment from "moment";
import { fireEvent, cleanup } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import mockData from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import GET_DATA from "./Criteria/getData";
import SEARCH from "./Results/searchQuery";
import USER_AVAILABILITY from "./Availability/getUserAvailability";
import UPDATE_AVAILABILITY from "./Availability/updateAvailability";
import REQUEST_CONSULTATION from "./Topic/requestConsultations";

afterEach(cleanup);

const getNextAvailableDate = date => {
  if (["Sa", "Su"].indexOf(moment(date).format("dd")) > -1) {
    return getNextAvailableDate(moment(date).add(1, "day"));
  }

  return date
    .hours(10)
    .minutes(0)
    .seconds(0)
    .milliseconds(0);
};

test("User can search for freelancers and request consultations with them", async () => {
  const day1 = getNextAvailableDate(moment().add(1, "day"));
  const day2 = getNextAvailableDate(moment(day1).add(1, "days"));
  const day3 = getNextAvailableDate(moment(day2).add(1, "days"));

  const user = mockData.user({
    availability: [
      day1.toISOString(),
      moment(day1)
        .add(30, "minutes")
        .toISOString(),
      day2.toISOString(),
      moment(day2)
        .add(30, "minutes")
        .toISOString(),
      day3.toISOString(),
      moment(day3)
        .add(30, "minutes")
        .toISOString(),
    ],
  });

  console.log("ASDFASDF", user.availability);

  const skill = mockData.skill({ name: "Marketing" });
  const industry = mockData.industry({ name: "Finance" });
  const specialists = [
    mockData.specialist({ name: "Tom" }),
    mockData.specialist({ name: "Bob" }),
    mockData.specialist({ name: "Jane" }),
    mockData.specialist({ name: "Frank" }),
  ];

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
        query: GET_DATA,
      },
      result: {
        data: {
          skills: [
            {
              ...skill,
              label: skill.name,
              value: skill.name,
            },
          ],
          industries: [
            {
              ...industry,
              label: industry.name,
              value: industry.name,
            },
          ],
        },
      },
    },
    {
      request: {
        query: SEARCH,
        variables: {
          skill: skill.name,
          industry: null,
          companyType: null,
        },
      },
      result: {
        data: {
          specialists: {
            __typename: "SpecialistConnection",
            totalCount: 0,
            nodes: specialists,
          },
        },
      },
    },
    {
      request: {
        query: USER_AVAILABILITY,
      },
      result: {
        data: {
          viewer: user,
        },
      },
    },
    {
      request: {
        query: UPDATE_AVAILABILITY,
        variables: {
          input: {
            id: user.id,
            timeZone: user.timeZone,
            availability: user.availability,
          },
        },
      },
      result: {
        data: {
          updateAvailability: {
            __typename: "UpdateAvailablePayload",
            user: user,
          },
        },
      },
    },
    {
      request: {
        query: REQUEST_CONSULTATION,
        variables: {
          input: {
            skill: skill.name,
            topic: "This is the topic",
            specialists: [specialists[0].id, specialists[1].id],
          },
        },
      },
      result: {
        data: {
          requestConsultations: {
            __typename: "RequestConsultationPayload",
            consultations: specialists,
          },
        },
      },
    },
  ];

  const app = renderApp({
    route: "/freelancer_search",
    graphQLMocks,
  });

  const skillInput = await app.findByPlaceholderText("Search for a skill");
  fireEvent.click(skillInput);
  fireEvent.keyDown(skillInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillInput, { key: "Enter" });

  const industryInput = app.getByPlaceholderText("Industry");
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });

  const searchButton = app.getByLabelText("Find a freelancer");
  fireEvent.click(searchButton);

  await app.findByText("We found 4", { exact: false });
  fireEvent.click(app.getByLabelText("Select Tom"));
  fireEvent.click(app.getByLabelText("Select Bob"));
  fireEvent.click(app.getByLabelText("Continue"));

  await app.findByText("Availability");
  fireEvent.click(app.getByLabelText("Continue"));

  await app.findByText("What would you like to cover", { exact: false });
  const topic = app.getByPlaceholderText(
    "What would you like to talk about..."
  );
  fireEvent.change(topic, { target: { value: "This is the topic" } });
  fireEvent.click(app.getByLabelText("Request Consultation"));

  const header = await app.findByText(
    "Your consultation request has been sent"
  );
  expect(header).toBeInTheDocument();
});

test("Going directly to resuts redirects back to criteria step", async () => {
  const user = mockData.user();
  const skill = mockData.skill({ name: "Marketing" });
  const industry = mockData.industry({ name: "Finance" });

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
        query: GET_DATA,
      },
      result: {
        data: {
          skills: [
            {
              ...skill,
              label: skill.name,
              value: skill.name,
            },
          ],
          industries: [
            {
              ...industry,
              label: industry.name,
              value: industry.name,
            },
          ],
        },
      },
    },
  ];

  const app = renderApp({
    route: "/freelancer_search/results",
    graphQLMocks,
  });

  const header = await app.findByText("Find the Perfect Freelancer");
  expect(header).toBeInTheDocument();
});
