import * as React from "react";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { useRoutedModal, useModal } from "@advisable/donut";
import FETCH_APPLICATION from "../fetchApplication.js";
import UPDATE_APPLICATION from "../updateApplication.js";
import { useNotifications } from "../../../components/Notifications";
import PreviousProjectForm from "../../../components/PreviousProjectForm";
import NoReferences from "./NoReferences";
import PreviousProjects from "./PreviousProjects";
import ConfirmationModal from "./ConfirmationModal";

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
  const confirmationModal = useModal();
  const { previousProjects } = application.specialist;
  const [updateApplication, { loading }] = useMutation(UPDATE_APPLICATION);
  const projectModal = useRoutedModal(
    `/invites/${applicationId}/apply/references/new_project/client`,
    {
      returnLocation: `/invites/${applicationId}/apply/references`,
    },
  );

  const handleSubmit = async (values, formik) => {
    if (values.references.length <= 1) {
      confirmationModal.show();
      formik.setSubmitting(false);
      return;
    }

    await submit(values);
  };

  const submit = async (values) => {
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
      { duration: 4000 },
    );
  };

  const initialValues = {
    references: application.previousProjects.map((r) => r.project.airtableId),
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {(formik) => (
        <>
          <ConfirmationModal
            formik={formik}
            loading={loading}
            modal={confirmationModal}
            onAddReference={projectModal.show}
            onSubmit={() => submit(formik.values)}
            noOfAvailableProjects={previousProjects.length}
          />

          <PreviousProjectForm
            modal={projectModal}
            specialist={application.specialist.airtableId}
            pathPrefix={`/invites/${applicationId}/apply/references`}
            onSuccess={handleNewProject}
            mutationUpdate={(proxy, response) => {
              const previousProject =
                response.data.createOffPlatformProject.previousProject;
              formik.setFieldValue(
                "references",
                formik.values.references.concat(
                  previousProject.project.airtableId,
                ),
              );
              const data = proxy.readQuery({
                query: FETCH_APPLICATION,
                variables: { id: applicationId },
              });
              data.application.specialist.previousProjects.push(
                previousProject,
              );
              proxy.writeQuery({ query: FETCH_APPLICATION, data });
            }}
          />

          {previousProjects.length > 0 ? (
            <PreviousProjects
              steps={steps}
              application={application}
              currentStep={currentStep}
              onBack={goBack}
              formik={formik}
              onAdd={projectModal.show}
              initialValues={{}}
              previousProjects={previousProjects}
              onSubmit={handleSubmit}
            />
          ) : (
            <NoReferences
              onSkip={confirmationModal.show}
              openAddReferenceModal={projectModal.show}
            />
          )}
        </>
      )}
    </Formik>
  );
};

export default References;
