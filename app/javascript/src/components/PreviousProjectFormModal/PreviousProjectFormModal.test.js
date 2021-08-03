import React from "react";
import {
  fireEvent,
  renderComponent,
  screen,
  mockQuery,
  mockViewer,
  mockMutation,
  mockData,
  waitForElementToBeRemoved,
} from "../../testHelpers/test-utils";
import { usePreviousProjectModal } from "./usePreviousProjectModal";
import PreviousProjectFormModal from "./index";
import {
  GET_PREVIOUS_PROJECT,
  CREATE_PREVIOUS_PROJECT,
  SELECT_DATA,
  UPDATE_PREVIOUS_PROJECT,
  PUBLISH_PREVIOUS_PROJECT,
} from "./queries";

function TestUI(props) {
  const btnRef = React.useRef(null);
  const modal = usePreviousProjectModal();

  return (
    <div>
      <button ref={btnRef} onClick={modal.show}>
        Open
      </button>
      <PreviousProjectFormModal
        modal={modal}
        unstable_finalFocusRef={btnRef}
        {...props}
      />
    </div>
  );
}

test("Adding a new project", async () => {
  const handleCreate = jest.fn();
  const handlePublish = jest.fn();
  const skill = mockData.industry({
    name: "Skill",
    value: "Skill",
    label: "Skill",
  });
  const skill2 = mockData.skill({
    name: "Skill 2",
    value: "Skill 2",
    label: "Skill 2",
  });
  const industry = mockData.industry({
    name: "Industry",
    value: "Industry",
    label: "Industry",
  });
  const industry2 = mockData.industry({
    name: "Industry 2",
    value: "Industry 2",
    label: "Industry 2",
  });
  const previousProject = mockData.previousProject({
    id: "pre_1",
    draft: true,
    industries: [industry],
    primaryIndustry: industry,
    title: "Project with company",
    goal: null,
    contactName: null,
    contactJobTitle: null,
    contactRelationship: null,
  });

  renderComponent(
    <TestUI onCreate={handleCreate} onPublish={handlePublish} />,
    {
      graphQLMocks: [
        mockViewer(mockData.specialist()),
        mockQuery(
          SELECT_DATA,
          {},
          {
            skills: [
              {
                ...skill,
                value: skill.name,
                label: skill.name,
              },
              { ...skill2, value: skill2.name, label: skill2.name },
            ],
            industries: [
              {
                ...industry,
                value: industry.name,
                label: industry.name,
              },
              {
                ...industry2,
                value: industry2.name,
                label: industry2.name,
              },
            ],
          },
        ),
        mockMutation(
          CREATE_PREVIOUS_PROJECT,
          {
            clientName: "Test inc",
            confidential: false,
            industries: ["Industry", "Industry 2"],
            primaryIndustry: "Industry 2",
            companyType: "Individual Entrepreneur",
          },
          {
            createPreviousProject: {
              __typename: "CreatePreivousProjectPayload",
              previousProject,
            },
          },
        ),
        mockMutation(
          UPDATE_PREVIOUS_PROJECT,
          {
            previousProject: "pre_1",
            description: "Description",
            skills: [skill.name, skill2.name],
            primarySkill: skill2.name,
            goal: "Custom goal",
            publicUse: true,
          },
          {
            updatePreviousProject: {
              __typename: "UpdatePreviousProjectPayload",
              previousProject: {
                ...previousProject,
                skills: [skill, skill2],
                primarySkill: skill2,
                goal: "Custom goal",
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
                ...previousProject,
                draft: false,
                contactName: "John Doe",
                contactJobTitle: "CEO",
                contactRelationship: "They managed the project",
              },
            },
          },
        ),
      ],
    },
  );

  fireEvent.click(await screen.findByText("Open"));
  const clientName = await screen.findByLabelText("Company Name");
  fireEvent.change(clientName, { target: { value: "Test inc" } });
  const industryField = screen.getByPlaceholderText(/search for an industry/i);
  fireEvent.click(industryField);
  fireEvent.keyDown(industryField, { key: "Return", keyCode: 13 });
  fireEvent.keyDown(industryField, { key: "ArrowDown", keyCode: 40 });
  fireEvent.keyDown(industryField, { key: "Return", keyCode: 13 });
  const primaryInput = screen.getByLabelText(
    "Which of these is the primary industry for this company?",
  );
  fireEvent.change(primaryInput, { target: { value: "Industry 2" } });
  let continueBtn = await screen.findByLabelText("Continue");
  fireEvent.click(continueBtn);

  const description = await screen.findByLabelText("Project description");
  fireEvent.change(description, { target: { value: "Description" } });
  const skillField = screen.getByPlaceholderText(/search for a skill/i);
  fireEvent.click(skillField);
  fireEvent.keyDown(skillField, { key: "Return", keyCode: 13 });
  fireEvent.keyDown(skillField, { key: "ArrowDown", keyCode: 40 });
  fireEvent.keyDown(skillField, { key: "Return", keyCode: 13 });
  fireEvent.change(
    screen.getByLabelText(
      "Which of these was the primary skill for this project?",
    ),
    { target: { value: "Skill 2" } },
  );

  fireEvent.change(
    screen.getByLabelText("What was your primary goal for this project?"),
    { target: { value: "Other" } },
  );

  fireEvent.change(screen.getByPlaceholderText(/What was your goal/i), {
    target: { value: "Custom goal" },
  });

  continueBtn = await screen.findByLabelText("Continue");
  fireEvent.click(continueBtn);
  // portfolio step
  continueBtn = await screen.findByLabelText("Skip");
  fireEvent.click(continueBtn);

  // More info step
  continueBtn = await screen.findByLabelText("Skip");
  fireEvent.click(continueBtn);

  fireEvent.change(screen.getByLabelText("Contact Name in LinkedIn"), {
    target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("Contact Job Title"), {
    target: { value: "CEO" },
  });
  continueBtn = await screen.findByLabelText("Submit Project");
  fireEvent.click(continueBtn);
  await waitForElementToBeRemoved(continueBtn);

  expect(handleCreate).toHaveBeenCalledTimes(1);
  expect(handlePublish).toHaveBeenCalledTimes(1);
});

test("can edit the description", async () => {
  const industry = mockData.industry({ label: "Industry", value: "Industry" });
  const skill = mockData.skill({ label: "Skill", value: "Skill" });
  const previousProject = mockData.previousProject({
    id: "pre_1",
    draft: false,
    industries: [industry],
    primaryIndustry: industry,
    title: "Project with company",
    skills: [skill],
    primarySkill: [skill],
    validationStatus: "Validated",
  });

  const graphQLMocks = [
    mockViewer(mockData.specialist()),
    mockQuery(
      SELECT_DATA,
      {},
      {
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
    ),
    mockQuery(GET_PREVIOUS_PROJECT, { id: "pre_1" }, { previousProject }),
    mockMutation(
      UPDATE_PREVIOUS_PROJECT,
      {
        previousProject: "pre_1",
        description: "Description updated",
      },
      {
        updatePreviousProject: {
          __typename: "UpdatePreviousProjectPayload",
          previousProject: {
            ...previousProject,
            description: "Description updated",
          },
        },
      },
    ),
  ];

  renderComponent(<TestUI />, {
    route: "testing/previous_projects/pre_1",
    graphQLMocks,
  });

  await screen.findByText(/Tell us a little more/i);
  fireEvent.change(screen.getByLabelText("Project description"), {
    target: { value: "Description updated" },
  });
  fireEvent.click(screen.getByLabelText("Save Changes"));
  await screen.findByText(/the project description has been updated/i);
});
