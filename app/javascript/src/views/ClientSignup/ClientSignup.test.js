import { times } from "lodash";
import {
  mockViewer,
  mockQuery,
  mockMutation,
} from "../../testHelpers/apolloMocks";
import { fireEvent } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import generateTypes from "../../__mocks__/graphqlFields";
import GET_DATA from "./Criteria/getData";
import SEARCH from "./Specialists/search";
import CREATE_ACCOUNT from "./SaveSearch/createAccount";
import GET_PROJECTS from "../Projects/getProjects";

beforeEach(() => {
  jest.setTimeout(10000);
});

test("Criteria step", async () => {
  const skill = generateTypes.skill();
  const industry = generateTypes.industry();
  const project = generateTypes.project();

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_DATA,
      {},
      {
        popularSkills: {
          __typename: "SkillsConnection",
          nodes: [skill],
        },
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
    mockQuery(
      SEARCH,
      {
        skill: skill.name,
        industry: industry.name,
        industryRequired: true,
        companyType: "Growth-Stage Startup",
        companyTypeRequired: true,
      },
      {
        specialists: {
          __typename: "SpecialistConnection",
          totalCount: 25,
          nodes: times(25, t =>
            generateTypes.specialist({
              id: `spe_${t}`,
              airtableId: `recSpecialist${t}`,
              hourlyRate: t * 10,
              name: `Specialist ${t}`,
            })
          ),
        },
      }
    ),
    mockMutation(
      CREATE_ACCOUNT,
      {
        skill: skill.name,
        industry: industry.name,
        industryExperienceRequired: true,
        companyType: "Growth-Stage Startup",
        companyTypeExperienceRequired: true,
        email: "test@test.com",
        specialists: ["spe_0", "spe_1"],
      },
      {
        createUserAccount: {
          __typename: "CreateUserAccountPayload",
          project: project,
        },
      }
    ),
  ];

  const app = renderApp({
    route: "/clients/signup",
    graphQLMocks,
  });

  const skillsInput = await app.findByPlaceholderText("Search for a skill");
  fireEvent.click(skillsInput);
  fireEvent.keyDown(skillsInput, { key: "ArrowDown" });
  fireEvent.keyDown(skillsInput, { key: "Enter" });
  const industryInput = app.getByPlaceholderText("Industry");
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });
  fireEvent.click(app.getByLabelText("Industry experience is important to me"));
  fireEvent.click(
    app.getByLabelText("Experience with this type of company is important")
  );
  const button = app.getByLabelText("Find a specialist");
  fireEvent.click(button);
  const budget = await app.findByLabelText("Select Budget");
  fireEvent.click(budget);
  fireEvent.click(app.getByLabelText("Select Specialist 0"));
  fireEvent.click(app.getByLabelText("Select Specialist 1"));
  fireEvent.click(app.getByLabelText("Continue"));
  const email = await app.findByLabelText("Email Address");
  fireEvent.change(email, { target: { value: "test@test.com" } });
  const btn = await app.findByLabelText("Continue");
  fireEvent.click(btn);

  const more = await app.findByText("Tell us more");
  expect(more).toBeInTheDocument();
});

test("Alternative flow", async () => {
  const skill = generateTypes.skill({ name: "Twitter Marketing" });
  const industry = generateTypes.industry();
  const project = generateTypes.project();

  const graphQLMocks = [
    mockViewer(null),
    mockQuery(
      GET_DATA,
      {},
      {
        popularSkills: {
          __typename: "SkillsConnection",
          nodes: [skill],
        },
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
    mockQuery(
      SEARCH,
      {
        skill: skill.name,
        industry: industry.name,
        industryRequired: true,
        companyType: "Growth-Stage Startup",
        companyTypeRequired: true,
      },
      {
        specialists: {
          __typename: "SpecialistConnection",
          totalCount: 25,
          nodes: times(25, t =>
            generateTypes.specialist({
              id: `spe_${t}`,
              airtableId: `recSpecialist${t}`,
              hourlyRate: t * 10,
              name: `Specialist ${t}`,
            })
          ),
        },
      }
    ),
    mockMutation(
      CREATE_ACCOUNT,
      {
        skill: skill.name,
        industry: industry.name,
        industryExperienceRequired: true,
        companyType: "Growth-Stage Startup",
        companyTypeExperienceRequired: true,
        email: "test@test.com",
        specialists: ["spe_0", "spe_1"],
      },
      {
        createUserAccount: {
          __typename: "CreateUserAccountPayload",
          project: project,
        },
      }
    ),
  ];

  const app = renderApp({
    route: "/clients/signup?alternative=true",
    graphQLMocks,
  });

  const popularSkill = await app.findByText(skill.name);
  fireEvent.click(popularSkill);
  fireEvent.click(
    app.getByLabelText(
      "Experience working at companies similar to mine is important"
    )
  );

  const industryInput = app.getByPlaceholderText("What industry are you in?");
  fireEvent.click(industryInput);
  fireEvent.keyDown(industryInput, { key: "ArrowDown" });
  fireEvent.keyDown(industryInput, { key: "Enter" });
  const button = app.getByLabelText("Find a specialist");
  fireEvent.click(button);

  const budget = await app.findByLabelText("Select Budget");
  fireEvent.click(budget);

  fireEvent.click(app.getByLabelText("Select Specialist 0"));
  fireEvent.click(app.getByLabelText("Select Specialist 1"));
  fireEvent.click(app.getByLabelText("Continue"));

  const email = await app.findByLabelText("Email Address");
  fireEvent.change(email, { target: { value: "test@test.com" } });
  const btn = await app.findByLabelText("Continue");
  fireEvent.click(btn);

  const more = await app.findByText("Tell us more");
  expect(more).toBeInTheDocument();
});

test("Redirects when there is already a viewer", async () => {
  const user = generateTypes.user({
    projects: [],
  });

  const graphQLMocks = [
    mockViewer(user),
    mockQuery(
      GET_PROJECTS,
      {},
      {
        viewer: user,
      }
    ),
  ];

  const app = renderApp({ route: "/clients/signup", graphQLMocks });
  const header = await app.findByText("Your projects");
  expect(header).toBeInTheDocument();
});
