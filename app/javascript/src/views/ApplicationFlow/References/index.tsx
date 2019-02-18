import * as React from "react";
import { Mutation, compose } from "react-apollo";
import { Heading, Text, Button, Padding } from "../../../components";
import AddPreviousProjectModal from "../../../components/AddPreviousProjectModal";
import PreviousProjects from "./PreviousProjects";
import FETCH_APPLICATION from "../fetchApplication.graphql";
import UPDATE_APPLICATION from "../updateApplication.graphql";

interface Values {
  rate: string;
  acceptsFee: boolean;
  acceptsTerms: boolean;
}

const References = ({
  application,
  match,
  history,
  steps,
  currentStep,
  location
}) => {
  const { applicationId } = match.params;
  const [modal, setModal] = React.useState(false);
  const { previousProjects } = application.specialist;

  const handleSubmit = updateApplication => {
    return async values => {
      await updateApplication({
        variables: {
          input: {
            ...values,
            id: applicationId
          }
        }
      });

      history.push({
        ...location,
        pathname: `/invites/${applicationId}/apply/terms`
      });
    };
  };

  const goBack = () => {
    let url: string;
    let questionsCount = application.questions.length;
    if (questionsCount > 0) {
      url = `/invites/${applicationId}/apply/questions/${questionsCount}`;
    } else {
      url = `/invites/${applicationId}/apply`;
    }

    history.push({
      ...location,
      pathname: url
    });
  };

  return (
    <Mutation mutation={UPDATE_APPLICATION}>
      {updateApplication => (
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
              steps={steps}
              application={application}
              currentStep={currentStep}
              onBack={goBack}
              onAdd={() => setModal(true)}
              initialValues={{
                references: application.previousProjects.map(
                  r => r.project.airtableId
                )
              }}
              previousProjects={previousProjects}
              onSubmit={handleSubmit(updateApplication)}
            />
          ) : (
            <Padding size="xl">
              <Padding bottom="s">
                <Heading level={1}>References</Heading>
              </Padding>
              <Padding bottom="l">
                <Text>
                  We require references from all freelancers prior to their
                  first project on Advisable. We do this to ensure that their
                  self-reported experience is verified by a third party. Only
                  once verified will these references be shown on your profile
                  and visible to clients.
                </Text>
              </Padding>
              <Button size="l" styling="green" onClick={() => setModal(true)}>
                Add a previous project
              </Button>
            </Padding>
          )}
        </React.Fragment>
      )}
    </Mutation>
  );
};

export default References;
