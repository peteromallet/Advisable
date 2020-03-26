import moment from "moment";
import { fireEvent } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import mockData from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import GET_DATA from "./Criteria/getData";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/apolloMocks";
import { getSearch, createSearch } from "./searchQueries";
import USER_AVAILABILITY from "./Availability/getUserAvailability";
import UPDATE_AVAILABILITY from "./Availability/updateAvailability";
import REQUEST_CONSULTATION from "./Topic/requestConsultations";

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

  const skill = mockData.skill({ name: "Marketing" });
  const industry = mockData.industry({ name: "Finance" });
  const user = mockData.user({
    industry,
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

  const specialists = [
    mockData.specialist({ name: "Tom" }),
    mockData.specialist({ name: "Bob" }),
    mockData.specialist({ name: "Jane" }),
    mockData.specialist({ name: "Frank" }),
  ];

  const graphQLMocks = [
    mockViewer(user),
    mockQuery(
      GET_DATA,
      {},
      {
        viewer: user,
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
      }
    ),
    mockMutation(
      createSearch,
      {
        skill: skill.name,
        industry: industry.name,
        companyType: "Startup",
        companyExperienceRequired: false,
        industryExperienceRequired: false,
      },
      {
        createSearch: {
          __typename: "CreateSearchPayload",
          search: mockData.search({
            skill,
            industry,
            recommendation: null,
            results: {
              __typename: "SpecialistConnection",
              nodes: specialists,
            },
          }),
        },
      }
    ),
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

test("User can search for freelancers and get a recommendation", async () => {
  const day1 = getNextAvailableDate(moment().add(1, "day"));
  const day2 = getNextAvailableDate(moment(day1).add(1, "days"));
  const day3 = getNextAvailableDate(moment(day2).add(1, "days"));

  const skill = mockData.skill({ name: "Marketing" });
  const industry = mockData.industry({ name: "Finance" });
  const user = mockData.user({
    industry,
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

  const specialists = [
    mockData.specialist({ name: "Tom" }),
    mockData.specialist({ name: "Bob" }),
  ];

  const graphQLMocks = [
    mockViewer(user),
    mockQuery(
      GET_DATA,
      {},
      {
        viewer: user,
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
      }
    ),
    mockMutation(
      createSearch,
      {
        skill: skill.name,
        industry: industry.name,
        companyType: "Startup",
        companyExperienceRequired: false,
        industryExperienceRequired: false,
      },
      {
        createSearch: {
          __typename: "CreateSearchPayload",
          search: mockData.search({
            skill,
            industry,
            recommendation: mockData.profileProject({
              industries: [industry],
              skills: [skill],
              reviews: [mockData.review()],
              specialist: specialists[0],
            }),
            results: {
              __typename: "SpecialistConnection",
              nodes: specialists,
            },
          }),
        },
      }
    ),
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
            specialists: [specialists[0].id],
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

  await app.findByText("We have the perfect freelancer for this!");
  fireEvent.click(
    app.getAllByLabelText(`Talk with ${specialists[0].firstName}`)[0]
  );

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
