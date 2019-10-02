import * as React from "react";
import { Formik } from "formik";
import { useMutation } from "react-apollo";
import FETCH_APPLICATION from "../fetchApplication.js";
import UPDATE_APPLICATION from "../updateApplication.js";
import { useNotifications } from "../../../components/Notifications";
import AddPreviousProjectModal from "../../../components/AddPreviousProjectModal";
import NoReferences from "./NoReferences";
import PreviousProjects from "./PreviousProjects";
import ConfirmationModal from "./ConfirmationModal";

const PREVIOUS_PROJECT_MODAL = "PREVIOUS_PROJECT_MODAL";
const CONFIRM_SUBMISSION = "CONFIRM_SUBMISSION";

const References = ({
  application,
  match,
  history,
  steps,
  skipStep,
  currentStep,
  location,
}) => {
  const { applicationId } = match.params;
  const notifications = useNotifications();
  const [modal, setModal] = React.useState(null);
  const { previousProjects } = application.specialist;
  const [updateApplication, { loading }] = useMutation(UPDATE_APPLICATION);

  const handleSubmit = async (values, formik) => {
    if (values.references.length <= 1) {
      setModal(CONFIRM_SUBMISSION);
      formik.setSubmitting(false);
      return;
    }

    await submit(values);
  };

  const submit = async values => {
    await updateApplication({
      variables: {
        input: {
          ...values,
          id: applicationId,
        },
      },
    });

    skipStep();
    history.push({
      ...location,
      pathname: `/invites/${applicationId}/apply/terms`,
    });
  };

  const goBack = () => {
    let url;
    let questionsCount = application.questions.length;
    if (questionsCount > 0) {
      url = `/invites/${applicationId}/apply/questions/${questionsCount}`;
    } else {
      url = `/invites/${applicationId}/apply`;
    }

    history.push({
      ...location,
      pathname: url,
    });
  };

  const handleNewProject = () => {
    notifications.notify(
      "We have sent an email with details on how to validate this project. In the meantime, you can add more references.",
      { duration: 4000 }
    );
  };

  const initialValues = {
    references: application.previousProjects.map(r => r.project.airtableId),
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {formik => (
        <>
          <AddPreviousProjectModal
            isOpen={modal === PREVIOUS_PROJECT_MODAL}
            onClose={() => setModal(null)}
            onCreate={handleNewProject}
            specialistId={application.specialist.airtableId}
            mutationUpdate={(proxy, response) => {
              const previousProject =
                response.data.createOffPlatformProject.previousProject;
              formik.setFieldValue(
                "references",
                formik.values.references.concat(
                  previousProject.project.airtableId
                )
              );
              const data = proxy.readQuery({
                query: FETCH_APPLICATION,
                variables: { id: applicationId },
              });
              data.application.specialist.previousProjects.push(
                previousProject
              );
              proxy.writeQuery({ query: FETCH_APPLICATION, data });
            }}
          />

          <ConfirmationModal
            formik={formik}
            loading={loading}
            onAddReference={() => setModal(PREVIOUS_PROJECT_MODAL)}
            onClose={() => setModal(null)}
            isOpen={modal === CONFIRM_SUBMISSION}
            onSubmit={() => submit(formik.values)}
            noOfAvailableProjects={previousProjects.length}
          />

          {previousProjects.length > 0 ? (
            <PreviousProjects
              steps={steps}
              application={application}
              currentStep={currentStep}
              onBack={goBack}
              formik={formik}
              onAdd={() => setModal(PREVIOUS_PROJECT_MODAL)}
              initialValues={{}}
              previousProjects={previousProjects}
              onSubmit={handleSubmit}
            />
          ) : (
            <NoReferences
              onSkip={() => setModal(CONFIRM_SUBMISSION)}
              openAddReferenceModal={() => setModal(PREVIOUS_PROJECT_MODAL)}
            />
          )}
        </>
      )}
    </Formik>
  );
};

export default References;
