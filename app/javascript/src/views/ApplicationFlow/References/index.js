import * as React from "react";
import { Formik, Form } from "formik";
import { useMutation, useApolloClient } from "@apollo/client";
import { Text, useModal } from "@advisable/donut";
import {
  fetchApplication as FETCH_APPLICATION,
  updateApplication as UPDATE_APPLICATION,
} from "../queries";
import { useNotifications } from "../../../components/Notifications";
import PreviousProjectFormModal, {
  usePreviousProjectModal,
} from "../../../components/PreviousProjectFormModal";
import NoReferences from "./NoReferences";
import PreviousProjects from "./PreviousProjects";
import ConfirmationModal from "./ConfirmationModal";
import StepCard from "../StepCard.js";

const References = ({
  application,
  match,
  history,
  steps,
  skipStep,
  currentStep,
  location,
}) => {
  const client = useApolloClient();
  const { applicationId } = match.params;
  const notifications = useNotifications();
  const confirmationModal = useModal();
  const specialist = application.specialist;
  const { previousProjects } = application.specialist;
  const [updateApplication, { loading }] = useMutation(UPDATE_APPLICATION);
  const newProjectModal = usePreviousProjectModal("/previous_projects/new");

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

  const handleNewProject = (project) => {
    const previous = client.readQuery({
      query: FETCH_APPLICATION,
      variables: { id: applicationId },
    });

    client.writeQuery({
      query: FETCH_APPLICATION,
      variables: { id: applicationId },
      data: {
        ...previous,
        application: {
          ...previous.application,
          specialist: {
            ...previous.application.specialist,
            previousProjects: {
              ...previous.application.specialist.previousProjects,
              nodes: [
                project,
                ...previous.application.specialist.previousProjects.nodes,
              ],
            },
          },
        },
      },
    });
  };

  const handlePublishProject = (formik) => (project) => {
    formik.setFieldValue(
      "references",
      formik.values.references.concat(project.id),
    );
    notifications.notify(
      "We have sent an email with details on how to validate this project. In the meantime, you can add more references.",
      { duration: 4000 },
    );
  };

  const initialValues = {
    references: application.previousProjects.map((project) => project.id),
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {(formik) => (
        <Form>
          <Text
            mb="xs"
            as="h1"
            fontSize="28px"
            color="blue900"
            fontWeight="semibold"
            letterSpacing="-0.02em"
          >
            References
          </Text>
          <Text lineHeight="m" color="neutral700" mb="l">
            Previous projects are the most effective way to validate your
            experience and suitability for a project. Please select the relevant
            projects below to attach to this application. The average successful
            application attaches at least 2 previous projects to their
            application.
          </Text>

          <ConfirmationModal
            formik={formik}
            loading={loading}
            modal={confirmationModal}
            newProjectModal={newProjectModal}
            onSubmit={() => submit(formik.values)}
            noOfAvailableProjects={previousProjects.length}
          />

          <PreviousProjectFormModal
            modal={newProjectModal}
            onCreate={handleNewProject}
            onPublish={handlePublishProject(formik)}
            specialistId={application.specialist.id}
          />

          {specialist.previousProjects.nodes.length === 0 && (
            <NoReferences
              newProjectModal={newProjectModal}
              confirmationModal={confirmationModal}
            />
          )}

          {specialist.previousProjects.nodes.length > 0 && (
            <PreviousProjects
              modal={newProjectModal}
              steps={steps}
              onBack={goBack}
              formik={formik}
              onSubmit={handleSubmit}
              application={application}
              currentStep={currentStep}
              previousProjects={specialist.previousProjects.nodes}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default References;
