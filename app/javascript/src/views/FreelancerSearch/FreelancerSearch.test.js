import { Settings } from "luxon";
import { renderRoute, fireEvent } from "../../testHelpers/test-utils";
import mockData from "../../__mocks__/graphqlFields";
import GET_DATA from "./Criteria/getData";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/apolloMocks";
import { createSearch } from "./searchQueries";
import USER_AVAILABILITY from "./Availability/getUserAvailability";
import UPDATE_AVAILABILITY from "./Availability/updateAvailability";
import REQUEST_CONSULTATION from "./Topic/requestConsultations";

// Its always 27th may 2020 at midday
Settings.now = () => new Date(2020, 4, 27, 12, 0, 0, 0).valueOf();

test("User can search for freelancers and request consultations with them", async () => {
  const skill = mockData.skill({ name: "Marketing" });
  const industry = mockData.industry({ name: "Finance" });
  const user = mockData.user({
    industry,
    availability: [
      "28-05-2020T10:00:000.000",
      "28-05-2020T11:00:000.000",
      "28-05-2020T12:00:000.000",
      "28-05-2020T13:00:000.000",
      "28-05-2020T14:00:000.000",
      "28-05-2020T15:00:000.000",
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
      },
    ),
    mockMutation(
      createSearch,
      {
        skill: skill.name,
        industry: industry.name,
        companyType: "Startup",
        companyExperienceRequired: false,
        industryExperienceRequired: false,
        description: "Description",
      },
      {
        createSearch: {
          __typename: "CreateSearchPayload",
          search: mockData.search({
            id: "sea_123",
            skill,
            industry,
            description: "Description",
            recommendation: null,
            results: {
              __typename: "SpecialistConnection",
              nodes: specialists,
            },
          }),
        },
      },
    ),
    mockQuery(USER_AVAILABILITY, {}, { viewer: user }),
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
            search: "sea_123",
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

  const app = renderRoute({
    route: "/freelancer_search",
    graphQLMocks,
  });

  const skillInput = await app.findByPlaceholderText(
    "Search for a skill",
    {},
    { timeout: 5000 },
  );
  fireEvent.click(skillInput);
  fireEvent.keyDown(skillInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillInput, { key: "Enter" });

  const industryInput = app.getByPlaceholderText("Industry");
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });

  const description = app.getByLabelText(
    "Please briefly describe what you're looking for",
  );
  fireEvent.change(description, { target: { value: "Description" } });

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
    "What would you like to talk about...",
  );
  fireEvent.change(topic, { target: { value: "This is the topic" } });
  fireEvent.click(app.getByLabelText("Request Consultation"));

  const header = await app.findByText(
    "Your consultation request has been sent",
  );
  expect(header).toBeInTheDocument();
});

test("User can search for freelancers and get a recommendation", async () => {
  const skill = mockData.skill({ name: "Marketing" });
  const industry = mockData.industry({ name: "Finance" });
  const user = mockData.user({
    industry,
    availability: [
      "28-05-2020T10:00:000.000",
      "28-05-2020T11:00:000.000",
      "28-05-2020T12:00:000.000",
      "28-05-2020T13:00:000.000",
      "28-05-2020T14:00:000.000",
      "28-05-2020T15:00:000.000",
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
      },
    ),
    mockMutation(
      createSearch,
      {
        skill: skill.name,
        industry: industry.name,
        companyType: "Startup",
        companyExperienceRequired: false,
        industryExperienceRequired: false,
        description: "Description",
      },
      {
        createSearch: {
          __typename: "CreateSearchPayload",
          search: mockData.search({
            id: "sea_123",
            skill,
            industry,
            description: "Description",
            recommendation: mockData.previousProject({
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
      },
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
            search: "sea_123",
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

  const app = renderRoute({
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
  const description = app.getByLabelText(
    "Please briefly describe what you're looking for",
  );
  fireEvent.change(description, { target: { value: "Description" } });

  const searchButton = app.getByLabelText("Find a freelancer");
  fireEvent.click(searchButton);

  await app.findByText("We have the perfect freelancer for this!");
  fireEvent.click(
    app.getAllByLabelText(`Talk with ${specialists[0].firstName}`)[0],
  );

  await app.findByText("Availability");
  fireEvent.click(app.getByLabelText("Continue"));

  await app.findByText("What would you like to cover", { exact: false });
  const topic = app.getByPlaceholderText(
    "What would you like to talk about...",
  );
  fireEvent.change(topic, { target: { value: "This is the topic" } });
  fireEvent.click(app.getByLabelText("Request Consultation"));

  const header = await app.findByText(
    "Your consultation request has been sent",
  );
  expect(header).toBeInTheDocument();
});
