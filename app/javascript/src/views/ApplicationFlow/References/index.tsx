import * as React from "react";
import { Mutation, compose } from "react-apollo";
import { Heading, Text, Button, Padding } from "../../../components";
import AddPreviousProjectModal from "../../../components/AddPreviousProjectModal";
import NoReferences from "./NoReferences";
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
  skipStep,
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

  const handleSkip = () => {
    skipStep()
    history.push({
      ...location,
      pathname: `/invites/${applicationId}/apply/terms`
    })
  }

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
            <NoReferences
              onSkip={handleSkip}
              openAddReferenceModal={() => setModal(true)}
            />
          )}
        </React.Fragment>
      )}
    </Mutation>
  );
};

export default References;
