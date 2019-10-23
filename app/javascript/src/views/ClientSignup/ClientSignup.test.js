import { times } from "lodash";
import { fireEvent, cleanup } from "@testing-library/react";
import renderApp from "../../testHelpers/renderApp";
import generateTypes from "../../__mocks__/graphqlFields";
import VIEWER from "../../graphql/queries/viewer";
import GET_DATA from "./Criteria/getData";
import SEARCH from "./Criteria/search";

afterEach(cleanup);

test("Criteria step", async () => {
  const skill = generateTypes.skill();
  const industry = generateTypes.industry();

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
              ...skill,
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
            totalCount: 25,
            nodes: times(25, t =>
              generateTypes.specialist({
                id: `spe_${t}`,
              })
            ),
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
  const loading = await app.findByText("Looking for specialists...");
  expect(loading).toBeInTheDocument();
});
