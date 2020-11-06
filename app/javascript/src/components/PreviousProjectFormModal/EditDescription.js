import React from "react";
import { Formik, Form } from "formik";
import { LockClosed, Refresh } from "@styled-icons/heroicons-solid";
import {
  Box,
  Text,
  Textarea,
  Button,
  Stack,
  Modal,
  Circle,
  useModal,
  Notice,
} from "@advisable/donut";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import { useNotifications } from "../../components/Notifications";
import Helper from "./Helper";
import { useUpdatePreviousProject } from "./queries";
import { Chunk } from 'editmode-react';

function EditDescription({ data }) {
  const modal = useModal();
  const notifications = useNotifications();
  const [updateProject] = useUpdatePreviousProject();
  const {
    id,
    pendingDescription,
    description,
    validationStatus,
  } = data.previousProject;

  const initialValues = {
    description: pendingDescription || description,
  };

  const handleSubmit = async (values) => {
    await updateProject({
      variables: {
        input: {
          previousProject: id,
          description: values.description,
        },
      },
    });

    modal.hide();
    notifications.notify("Your changes have been saved");
  };

  const handleSaveChanges = (formik) => (e) => {
    if (validationStatus === "Pending") {
      formik.submitForm();
      e.preventDefault();
      return null;
    } else {
      modal.show();
    }
  };

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          <Chunk identifier='edit_project_description_header'>Project Description</Chunk>
        </Text>
        <Text lineHeight="l" color="neutral600" mb="xl">
          <Chunk identifier='edit_project_description_description'>
            Tell us a little more about your involvement in this project.
            Please provide as specific information as possible about the results of this project.
          </Chunk>
        </Text>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              <Modal modal={modal} padding="l" label="Approve changes">
                <Box textAlign="center">
                  <Circle size={50} bg="orange200" color="orange900" mb="m">
                    <LockClosed size={24} />
                  </Circle>
                  <Text
                    mb="xs"
                    fontSize="xl"
                    color="blue900"
                    fontWeight="semibold"
                  >
                    <Chunk identifier='requires_approval_modal_title'>Requires approval</Chunk>
                  </Text>
                  <Text color="neutral700" lineHeight="s" mb="l">
                    <Chunk identifier='requires_approval_modal_description'>
                      The details of this project have already been reviewed. The
                      Advisable team will need to review and approve these changes.
                    </Chunk>
                  </Text>
                  <SubmitButton mr="xxs">
                    <Chunk identifier='requires_approval_modal_submit_btn'>Save Changes</Chunk>
                  </SubmitButton>
                  <Button ml="xxs" onClick={modal.hide} variant="secondary">
                    <Chunk identifier='requires_approval_modal_cancel_btn'>Cancel</Chunk>
                  </Button>
                </Box>
              </Modal>
              <Stack spacing="l">
                <FormField
                  minRows={8}
                  as={Textarea}
                  name="description"
                  label={<Chunk identifier='edit_project_description_label'>Project description</Chunk>}
                  description={
                    <Chunk identifier='edit_project_description_label_description'>
                      Please describe the problem they had, an overview of the project,
                      how you approached it and the results you achieved.
                    </Chunk>
                  }
                />
                {pendingDescription ? (
                  <Notice title={<Chunk identifier='pending_approval_notice_title'>Pending approval</Chunk>} icon={<Refresh />}>
                    <Chunk identifier='pending_approval_notice_description'>The advisable team are reviewing your requested changes</Chunk>
                  </Notice>
                ) : null}
                <Button
                  type="button"
                  loading={formik.isSubmitting}
                  onClick={handleSaveChanges(formik)}
                >
                  <Chunk identifier='edit_project_description_save_btn'>Save Changes</Chunk>
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        ml="50px"
        width={320}
        flexShrink={0}
        display={["none", "none", "none", "block"]}
      >
        <Helper>
          <Helper.Text heading={<Chunk identifier='edit_project_what_is_this_helper_title'>What&apos;s this for?</Chunk>} mb="l">
            <Chunk identifier='edit_project_what_is_this_helper_description'>
              The Advisable team will review and score the information you provide
              here in order to decide whether to propose you to clients.
            </Chunk>
          </Helper.Text>
          <Helper.Text heading={<Chunk identifier='edit_project_who_will_see_helper_title'>Who will see this?</Chunk>}>
            <Chunk identifier='edit_project_who_will_see_helper_description'>
              This will be seen by potential clients when applying for projects on Advisable.
              Please provide as specific information as possible about the results of this project.
              Include URLs and examples of work where possible.
            </Chunk>
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}

export default EditDescription;
