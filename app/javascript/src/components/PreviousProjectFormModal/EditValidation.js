import React from "react";
import { Formik, Form } from "formik";
// Components
import { Box, Text, Select, Stack, Button } from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import FormField from "src/components/FormField";
import { verificationValidationSchema } from "./validationSchemas";
import Helper from "./Helper";
// Queries
import { useUpdatePreviousProject } from "./queries";

const RELATIONSHIPS = [
  "They managed the project",
  "They worked on the project with me",
  "They worked at the company but not the project",
];

export default function EditValidation({ data }) {
  const [updatePreviousProject] = useUpdatePreviousProject();
  const notifications = useNotifications();

  const handleSaveChanges = async (values) => {
    await updatePreviousProject({
      variables: {
        input: {
          previousProject: data.previousProject.id,
          ...values,
        },
      },
    });

    notifications.notify("Your changes have been saved");
  };

  const initialValues = {
    contactName: data.previousProject.contactName || "",
    contactJobTitle: data.previousProject.contactJobTitle || "",
    contactRelationship:
      data.previousProject.contactRelationship || RELATIONSHIPS[0],
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} width="100%">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSaveChanges}
          validationSchema={verificationValidationSchema}
        >
          {(formik) => (
            <Form>
              <Text
                mb="xs"
                fontSize="28px"
                color="blue900"
                fontWeight="semibold"
              >
                Validation
              </Text>
              <Text lineHeight="l" color="neutral600" mb="xl">
                We will need to confirm the details of this project with someone
                who worked on the project.
              </Text>
              <Stack mb="xl" spacing="l">
                <FormField
                  name="contactName"
                  label="Contact Name"
                  placeholder="Contact Name"
                  autoComplete="off"
                />
                <FormField
                  name="contactJobTitle"
                  label="Contact Job Title"
                  placeholder="Contact Job Title"
                  autoComplete="off"
                />
                <FormField
                  as={Select}
                  name="contactRelationship"
                  label="What was your relationship to them for this project?"
                >
                  {RELATIONSHIPS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </FormField>
              </Stack>

              <Button
                size="l"
                type="submit"
                disabled={!formik.dirty}
                loading={formik.isSubmitting}
              >
                Save Changes
              </Button>
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
            You&apos;ll be given a unique link to share with this reference in
            order for them to validate this project.
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}
