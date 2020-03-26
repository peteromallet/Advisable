import React from "react";
import { repeat } from "lodash";
import { fireEvent, waitFor } from "@testing-library/react";
import mockData from "../../../__mocks__/graphqlFields";
import { useRoutedModal } from "../../../../../../donut/src";
import { renderComponent } from "../../../testHelpers/renderApp";
import PreviousProjectForm from "../";
import GET_DATA from "../getData";
import CREATE_PROJECT from "../createOffPlatformProject";

const skill = mockData.skill();
const industry = mockData.industry();
const specialist = mockData.specialist();
const onSuccess = jest.fn();

test("Can create a project", async () => {
  const description = repeat("description", 50);
  const comp = renderComponent(<Test />, {
    route: "/testing/new_project/client",
    graphQLMocks: [
      {
        request: {
          query: GET_DATA,
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
              contactRelationship: "They managed the project",
              goal: "Custom goal",
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
                project: mockData.offPlatformProject({
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
    ],
  });

  let back, next;
  const clientName = await comp.findByLabelText("Client Name");
  fireEvent.change(clientName, { target: { value: "Test inc" } });
  next = await comp.findByLabelText("Continue");
  fireEvent.click(next);
  // Test going back and then fourth again
  back = await comp.findByLabelText("Back");
  fireEvent.click(back);
  next = await comp.findByLabelText("Continue");
  fireEvent.click(next);

  const industryField = await comp.findByPlaceholderText(
    "e.g Financial Services"
  );
  fireEvent.click(industryField);
  fireEvent.keyDown(industryField, { key: "ArrowDown" });
  fireEvent.keyDown(industryField, { key: "Enter" });
  const skillField = await comp.findByPlaceholderText("e.g Facebook Marketing");
  fireEvent.click(skillField);
  fireEvent.keyDown(skillField, { key: "ArrowDown" });
  fireEvent.keyDown(skillField, { key: "Enter" });
  next = await comp.findByLabelText("Continue");
  fireEvent.click(next);

  const goal = await comp.findByLabelText(
    "What was your primary goal for this project?"
  );
  fireEvent.change(goal, { target: { value: "Improve retention" } });
  const goalOtherPlaceholder = "What was your goal for this project...";
  expect(
    comp.queryByPlaceholderText(goalOtherPlaceholder)
  ).not.toBeInTheDocument();
  fireEvent.change(goal, { target: { value: "Other" } });
  const goalOther = comp.getByPlaceholderText(goalOtherPlaceholder);
  fireEvent.change(goalOther, { target: { value: "Custom goal" } });
  const overview = await comp.findByPlaceholderText("Project overview...");
  fireEvent.change(overview, { target: { value: description } });
  next = await comp.findByLabelText("Continue");
  fireEvent.click(next);

  const contactName = await comp.findByPlaceholderText("Contact Name");
  fireEvent.change(contactName, { target: { value: "Test Person" } });
  const role = await comp.findByPlaceholderText("e.g Head of Marketing");
  fireEvent.change(role, { target: { value: "CEO" } });
  next = await comp.findByLabelText("Add Previous Project");
  fireEvent.click(next);
  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalled();
  });
});

function Test() {
  const modal = useRoutedModal("/testing/new_project/client", {
    returnLocation: "/testing",
  });

  return (
    <PreviousProjectForm
      modal={modal}
      pathPrefix="/testing"
      specialist={specialist.id}
      onSuccess={onSuccess}
    />
  );
}
