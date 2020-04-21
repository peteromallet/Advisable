import {
  fireEvent,
  renderRoute,
  mockMutation,
  waitForElementToBeRemoved,
} from "test-utils";
import viewer from "../../../../graphql/queries/viewer";
import generateTypes from "../../../../__mocks__/graphqlFields";
import GET_PROJECTS from "../previousProjects";
import {
  SELECT_DATA,
  CREATE_PREVIOUS_PROJECT,
  UPDATE_PREVIOUS_PROJECT,
  PUBLISH_PREVIOUS_PROJECT,
} from "../../../../components/PreviousProjectFormModal/queries";

test("Adds a previous project", async () => {
  const specialist = generateTypes.specialist();
  const skill = generateTypes.skill();
  const industry = generateTypes.industry();

  let project = generateTypes.previousProject({
    id: "pre_1",
    draft: true,
    primaryIndustry: industry,
    industries: [industry],
    title: "This is the new project",
    goal: null,
    contactName: null,
    contactJobTitle: null,
    contactRelationship: null,
  });

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
            previousProjects: {
              __typename: "PreviousProjectsConnection",
              nodes: [],
            },
          },
        },
      },
    },
    {
      request: {
        query: SELECT_DATA,
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
        query: CREATE_PREVIOUS_PROJECT,
        variables: {
          input: {
            clientName: "Test inc",
            confidential: false,
            industries: [industry.name],
            primaryIndustry: industry.name,
            companyType: "Individual Entrepreneur",
            specialist: specialist.id,
          },
        },
      },
      result: {
        data: {
          __typename: "Mutation",
          createPreviousProject: {
            __typename: "CreatePreivousProjectPayload",
            previousProject: project,
          },
        },
      },
    },
    mockMutation(
      UPDATE_PREVIOUS_PROJECT,
      {
        previousProject: "pre_1",
        description: "Description",
        skills: [skill.name],
        primarySkill: skill.name,
        goal: "Generate Leads",
        publicUse: true,
      },
      {
        updatePreviousProject: {
          __typename: "UpdatePreviousProjectPayload",
          previousProject: {
            ...project,
            skills: [skill],
            primarySkill: skill,
            goal: "Generate Leads",
            publicUse: true,
          },
        },
      },
    ),
    mockMutation(
      PUBLISH_PREVIOUS_PROJECT,
      {
        previousProject: "pre_1",
        contactName: "John Doe",
        contactJobTitle: "CEO",
        contactRelationship: "They managed the project",
      },
      {
        publishPreviousProject: {
          __typename: "UpdatePreviousProjectPayload",
          previousProject: {
            ...project,
            draft: false,
            contactName: "John Doe",
            contactJobTitle: "CEO",
            contactRelationship: "They managed the project",
          },
        },
      },
    ),
  ];

  const app = renderRoute({
    route: "/profile/references",
    graphQLMocks: apiMocks,
  });

  const button = await app.findAllByLabelText(
    "Add a previous project",
    {},
    { timeout: 5000 },
  );
  fireEvent.click(button[0]);
  const clientName = await app.findByLabelText("Company Name");
  fireEvent.change(clientName, { target: { value: "Test inc" } });
  const industryField = await app.findByPlaceholderText(
    "Search for an industry",
  );
  fireEvent.click(industryField);
  fireEvent.keyDown(industryField, { key: "ArrowDown" });
  fireEvent.keyDown(industryField, { key: "Enter" });
  let next = await app.findByLabelText("Continue");
  fireEvent.click(next);

  const description = await app.findByLabelText("Project description");
  fireEvent.change(description, { target: { value: "Description" } });
  const skillField = await app.findByPlaceholderText("Search for a skill");
  fireEvent.click(skillField);
  fireEvent.keyDown(skillField, { key: "ArrowDown" });
  fireEvent.keyDown(skillField, { key: "Enter" });
  next = await app.findByLabelText("Continue");
  fireEvent.click(next);

  next = await app.findByLabelText("Skip");
  fireEvent.click(next);

  fireEvent.change(app.getByLabelText("Contact Name"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(app.getByLabelText("Contact Job Title"), {
    target: { value: "CEO" },
  });
  next = await app.findByLabelText("Publish Project");
  fireEvent.click(next);
  await waitForElementToBeRemoved(next);

  const projectTitle = app.getByText(project.title);
  expect(projectTitle).toBeInTheDocument();
});
