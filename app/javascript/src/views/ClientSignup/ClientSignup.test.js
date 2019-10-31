import { times } from "lodash";
import { fireEvent, cleanup, wait } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import generateTypes from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import GET_DATA from "./Criteria/getData";
import SEARCH from "./Criteria/search";
import CREATE_ACCOUNT from "./SaveSearch/createAccount";

afterEach(cleanup);

beforeEach(() => {
  jest.setTimeout(10000);
});

test("Criteria step", async () => {
  const skill = generateTypes.skill();
  const industry = generateTypes.industry();
  const project = generateTypes.project();

  const graphQLMocks = [
    {
      request: {
        query: VIEWER,
      },
      result: {
        data: {
          viewer: null,
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
        },
      },
      result: {
        data: {
          specialists: {
            __typename: "SpecialistConnection",
            totalCount: 25,
            nodes: times(25, t =>
              generateTypes.specialist({
                id: `spe_${t}`,
                airtableId: `recSpecialist${t}`,
                hourlyRate: t * 10,
              })
            ),
          },
        },
      },
    },
    {
      request: {
        query: CREATE_ACCOUNT,
        variables: {
          input: {
            skill: skill.name,
            industry: industry.name,
            companyType: "Growth-Stage Startup",
            email: "test@test.com",
            specialists: ["recSpecialist0", "recSpecialist1"],
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          createUserAccount: {
            __typename: "CreateUserAccountPayload",
            project: project,
          },
        },
      },
    },
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
  const button = app.getByLabelText("Find a specialist");
  fireEvent.click(button);
  const budget = await app.findByLabelText("Budget");
  fireEvent.click(budget);
  const buttons = await app.queryAllByLabelText("Add");
  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[1]);
  const next = await app.queryAllByLabelText("Continue")[0];
  fireEvent.click(next);
  const email = await app.findByLabelText("Email Address");
  fireEvent.change(email, { target: { value: "test@test.com" } });
  const btn = await app.findByLabelText("Continue");
  fireEvent.click(btn);
  await wait();
  const more = await app.findByText("Tell us more");
  expect(more).toBeInTheDocument();
});
