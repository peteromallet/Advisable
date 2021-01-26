import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Textarea, Stack } from "@advisable/donut";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import { useNotifications } from "../../components/Notifications";
import Helper from "./Helper";
import { useUpdatePreviousProject } from "./queries";

function EditDescription({ data }) {
  const notifications = useNotifications();
  const [updateProject] = useUpdatePreviousProject();
  const { id, description } = data.previousProject;

  const initialValues = { description };

  const handleSubmit = async (values) => {
    await updateProject({
      variables: {
        input: {
          previousProject: id,
          description: values.description,
        },
      },
    });

    notifications.notify("The project description has been updated");
  };

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Text mb="xs" fontSize="28px" color="blue900" fontWeight="semibold">
          Project Description
        </Text>
        <Text lineHeight="l" color="neutral600" mb="xl">
          Tell us a little more about your involvement in this project. Please
          provide as specific information as possible about the results of this
          project.
        </Text>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Stack spacing="l">
                <FormField
                  minRows={8}
                  as={Textarea}
                  name="description"
                  label="Project description"
                  description="Please describe the problem they had, an overview of the project, how you approached it and the results you achieved."
                />
                <SubmitButton
                  type="button"
                  disabled={!formik.dirty}
                  loading={formik.isSubmitting}
                >
                  Save Changes
                </SubmitButton>
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
          <Helper.Text heading="What's this for?" mb="l">
            The Advisable team will review and score the information you provide
            here in order to decide whether to propose you to clients.
          </Helper.Text>
          <Helper.Text heading="Who will see this?">
            This will be seen by potential clients when applying for projects on
            Advisable. Please provide as specific information as possible about
            the results of this project. Include URLs and examples of work where
            possible.
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}

export default EditDescription;
