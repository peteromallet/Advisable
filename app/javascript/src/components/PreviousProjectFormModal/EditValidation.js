import React from "react";
import { Formik, Form } from "formik";
// Components
import { Box, Text, Select, Stack, Button, useModal } from "@advisable/donut";
import FormField from "src/components/FormField";
import { verificationValidationSchema } from "./validationSchemas";
import Helper from "./Helper";
import ValidationModal from "src/components/PreviousProjectValidationModal";
// Queries
import { useUpdatePreviousProject } from "./queries";
import { RELATIONSHIPS } from "./data";

export default function EditValidation({ data }) {
  const [updatePreviousProject] = useUpdatePreviousProject();
  const validationModal = useModal();
  const { contactName, contactJobTitle, contactRelationship } =
    data.previousProject;

  const handleSaveChanges = async (values) => {
    await updatePreviousProject({
      variables: {
        input: {
          previousProject: data.previousProject.id,
          ...values,
        },
      },
    });

    validationModal.show();
  };

  const initialValues = {
    contactName: contactName || "",
    contactJobTitle: contactJobTitle || "",
    contactRelationship: contactRelationship || RELATIONSHIPS[0],
  };

  return (
    <Box display="flex">
      <ValidationModal
        modal={validationModal}
        previousProject={data.previousProject}
        title="Contact details successfully updated!"
        description={`To validate this project, please share this link with ${contactName}`}
      />
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
                  label="Contact Name in LinkedIn"
                  description="We will ask the client to login with LinkedIn to confirm their identity when validating this project. Please ensure the name you provide matches their name on LinkedIn."
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
