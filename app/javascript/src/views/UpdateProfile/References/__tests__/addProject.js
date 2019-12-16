import { repeat } from "lodash";
import { cleanup, fireEvent } from "@testing-library/react";
import viewer from "../../../../graphql/queries/viewer";
import renderApp from "../../../../testHelpers/renderApp";
import generateTypes from "../../../../__mocks__/graphqlFields";
import GET_PROJECTS from "../previousProjects";
import FETCH_DATA from "../../../../components/PreviousProjectForm/getData";
import CREATE_PROJECT from "../../../../components/PreviousProjectForm/createOffPlatformProject";

afterEach(cleanup);

jest.setTimeout(10000);

test("Adds a previous project", async () => {
  const specialist = generateTypes.specialist();
  const skill = generateTypes.skill();
  const industry = generateTypes.industry();
  const description = repeat("description", 50);

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
          skills: [skill],
          industries: [industry],
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
            industries: [industry.name],
            primaryIndustry: industry.name,
            skills: [skill.name],
            primarySkill: skill.name,
            description: description,
            companyType: "Individual Entrepreneur",
            publicUse: true,
            contactName: "Test Person",
            contactJobTitle: "CEO",
            goal: "Generate Leads",
            specialist: specialist.id,
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
  const clientName = await findByLabelText("Client Name");
  fireEvent.change(clientName, { target: { value: "Test inc" } });
  let next = await findByLabelText("Continue");
  fireEvent.click(next);
  const industryField = await findByPlaceholderText("e.g Financial Services");
  fireEvent.click(industryField);
  fireEvent.keyDown(industryField, { key: "ArrowDown" });
  fireEvent.keyDown(industryField, { key: "Enter" });
  const skillField = await findByPlaceholderText("e.g Facebook Marketing");
  fireEvent.click(skillField);
  fireEvent.keyDown(skillField, { key: "ArrowDown" });
  fireEvent.keyDown(skillField, { key: "Enter" });
  next = await findByLabelText("Continue");
  fireEvent.click(next);
  const overview = await findByPlaceholderText("Project overview...");
  fireEvent.change(overview, { target: { value: description } });
  next = await findByLabelText("Continue");
  fireEvent.click(next);
  const contactName = await findByPlaceholderText("Contact Name");
  fireEvent.change(contactName, { target: { value: "Test Person" } });
  const role = await findByPlaceholderText("e.g Head of Marketing");
  fireEvent.change(role, { target: { value: "CEO" } });
  const complete = await findByLabelText("Add Previous Project");
  fireEvent.click(complete);
  const project = await findByText("Testing at Test inc");
  expect(project).toBeInTheDocument();
});
