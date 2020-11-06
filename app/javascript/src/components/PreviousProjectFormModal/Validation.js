import React from "react";
import { Formik, Form } from "formik";
import { ArrowLeft } from "@styled-icons/feather";
import { Box, Text, Select, Stack, Link, Button } from "@advisable/donut";
import Helper from "./Helper";
import { usePublishPreviousProject } from "./queries";
import { verificationValidationSchema } from "./validationSchemas";
import FormField from "../../components/FormField";
import { Chunk } from 'editmode-react';

const RELATIONSHIPS = [
  "They managed the project",
  "They worked on the project with me",
  "They worked at the company but not the project",
];

export default function Validation({ data, modal, onPublish }) {
  const [publishPreviousProject] = usePublishPreviousProject();

  const handleSubmit = async (values) => {
    const response = await publishPreviousProject({
      variables: {
        input: {
          previousProject: data.previousProject.id,
          ...values,
        },
      },
    });

    const project = response.data?.publishPreviousProject.previousProject;
    if (onPublish) {
      onPublish(project);
    }

    modal.hide();
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
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={verificationValidationSchema}
        >
          {(formik) => (
            <Form>
              <Link
                mb="s"
                fontSize="l"
                fontWeight="medium"
                to={`${modal.returnPath}/previous_projects/${data.previousProject.id}/more`}
              >
                <Box display="inline-block" mr="xxs">
                  <ArrowLeft size={20} strokeWidth={2} />
                </Box>
                <Chunk identifier='validation_back_btn'>Back</Chunk>
              </Link>
              <Text
                mb="xs"
                fontSize="28px"
                color="blue900"
                fontWeight="semibold"
              >
                <Chunk identifier='validation_header'>Validation</Chunk>
              </Text>
              <Text lineHeight="l" color="neutral600" mb="xl">
                <Chunk identifier='validation_description'>
                  We will need to confirm the details of this project with someone who worked on the project.
                </Chunk>
              </Text>
              <Stack mb="xl" spacing="l">
                <FormField
                  name="contactName"
                  label={<Chunk identifier='validation_contact_name_label'>Contact Name</Chunk>}
                  placeholder="Contact Name"
                  autoComplete="off"
                />
                <FormField
                  name="contactJobTitle"
                  label={<Chunk identifier='validation_contact_job_title_label'>Contact Job Title</Chunk>}
                  placeholder="Contact Job Title"
                  autoComplete="off"
                />
                <FormField
                  as={Select}
                  name="contactRelationship"
                  label={<Chunk identifier='validation_contact_relationship_label'>What was your relationship to them for this project?</Chunk>}
                >
                  {RELATIONSHIPS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </FormField>
              </Stack>

              <Button size="l" type="submit" loading={formik.isSubmitting}>
                <Chunk identifier='submit_project_btn'>Submit Project</Chunk>
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
          <Helper.Text heading={<Chunk identifier='validation_what_is_this_helper_title'>What&apos;s this for?</Chunk>} mb="l">
            <Chunk identifier='validation_what_is_this_helper_description'>
              You&apos;ll be given a unique link to share with this reference in order for them to validate this project.
            </Chunk>
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}
