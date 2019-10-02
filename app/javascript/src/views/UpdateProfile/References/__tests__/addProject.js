import { cleanup, fireEvent } from "@testing-library/react";
import viewer from "../../../../graphql/queries/viewer";
import renderApp from "../../../../testHelpers/renderApp";
import generateTypes from "../../../../__mocks__/graphqlFields";
import GET_PROJECTS from "../previousProjects";
import FETCH_DATA from "../../../../components/AddPreviousProjectModal/fetchData";
import CREATE_PROJECT from "../../../../components/AddPreviousProjectModal/createOffPlatformProject";

afterEach(cleanup);

test("Adds a previous project", async () => {
  const specialist = generateTypes.specialist();
  const skill = generateTypes.skill();
  const industry = generateTypes.industry();

  const apiMocks = [
    {
      request: {
        query: viewer,
      },
      result: {
        data: {
          viewer: specialist,
        },
      },
    },
    {
      request: {
        query: GET_PROJECTS,
      },
      result: {
        data: {
          viewer: {
            ...specialist,
            previousProjects: [],
          },
        },
      },
    },
    {
      request: {
        query: FETCH_DATA,
      },
      result: {
        data: {
          skills: [
            {
              ...skill,
              value: skill.name,
              label: skill.name,
            },
          ],
          industries: [
            {
              ...industry,
              value: industry.name,
              label: industry.name,
            },
          ],
        },
      },
    },
    {
      request: {
        query: CREATE_PROJECT,
        variables: {
          input: {
            clientName: "Test inc",
            confidential: false,
            industry: industry.name,
            skills: [skill.name],
            description: "testing",
            companyType: "Individual Entrepreneur",
            publicUse: true,
            contactName: "Test Person",
            contactJobTitle: "CEO",
            specialistId: specialist.airtableId,
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          createOffPlatformProject: {
            __typename: "CreateOffPlatformProjectPayload",
            previousProject: {
              __typename: "PreviousProject",
              project: generateTypes.offPlatformProject({
                primarySkill: "Testing",
                clientName: "Test inc",
              }),
              specialist,
              reviews: [],
            },
          },
        },
      },
    },
  ];

  const { findByText, findByLabelText, findByPlaceholderText } = renderApp({
    route: "/profile/references",
    graphQLMocks: apiMocks,
  });

  const button = await findByLabelText("Add a previous project");
  fireEvent.click(button);
  const clientName = await findByLabelText("What was the client's name?");
  fireEvent.change(clientName, { target: { value: "Test inc" } });
  const industryField = await findByPlaceholderText("e.g Financial Services");
  fireEvent.click(industryField);
  fireEvent.keyDown(industryField, { key: "ArrowDown" });
  fireEvent.keyDown(industryField, { key: "Enter" });
  const skillField = await findByPlaceholderText("Search for a skill...");
  fireEvent.click(skillField);
  fireEvent.keyDown(skillField, { key: "ArrowDown" });
  fireEvent.keyDown(skillField, { key: "Enter" });
  let next = await findByLabelText("Next");
  fireEvent.click(next);
  const overview = await findByPlaceholderText("Project overview...");
  fireEvent.change(overview, { target: { value: "testing" } });
  next = await findByLabelText("Next");
  fireEvent.click(next);
  const contactName = await findByPlaceholderText("Contact name");
  fireEvent.change(contactName, { target: { value: "Test Person" } });
  const role = await findByPlaceholderText("Contact job title");
  fireEvent.change(role, { target: { value: "CEO" } });
  const complete = await findByLabelText("Complete");
  fireEvent.click(complete);
  const project = await findByText("Testing at Test inc");
  expect(project).toBeInTheDocument();
});
