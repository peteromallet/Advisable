import * as React from "react";
import { Heading, Text, Button, Padding } from "../../../components";
import AddPreviousProjectModal from "../../../components/AddPreviousProjectModal";
import PreviousProjects from "./PreviousProjects";
import FETCH_APPLICATION from "../fetchApplication.graphql";

interface Values {
  rate: string;
  acceptsFee: boolean;
  acceptsTerms: boolean;
}

const References = ({ application, match, steps, currentStep }) => {
  const { applicationId } = match.params;
  const [modal, setModal] = React.useState(false);
  const { previousProjects } = application.specialist;
  console.log(previousProjects);

  return (
    <React.Fragment>
      <AddPreviousProjectModal
        isOpen={modal}
        onClose={() => setModal(false)}
        specialistId={application.specialist.airtableId}
        mutationUpdate={(proxy, response) => {
          const data = proxy.readQuery({
            query: FETCH_APPLICATION,
            variables: { id: applicationId }
          });
          const project =
            response.data.createOffPlatformProject.previousProject;
          data.application.specialist.previousProjects.push(project);
          proxy.writeQuery({ query: FETCH_APPLICATION, data });
        }}
      />

      {previousProjects.length > 0 ? (
        <PreviousProjects
          previousProjects={previousProjects}
          onAdd={() => setModal(true)}
        />
      ) : (
        <Padding size="xl">
          <Padding bottom="s">
            <Heading level={1}>References</Heading>
          </Padding>
          <Padding bottom="l">
            <Text>
              We require references from all freelancers prior to their first
              project on Advisable. We do this to ensure that their
              self-reported experience is verified by a third party. Only once
              verified will these references be shown on your profile and
              visible to clients.
            </Text>
          </Padding>
          <Button size="l" styling="green" onClick={() => setModal(true)}>
            Add a previous project
          </Button>
        </Padding>
      )}
    </React.Fragment>
  );
};

export default References;
