import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Select, Stack, Link, Icon, Button } from "@advisable/donut";
import Helper from "./Helper";
import { usePublishPreviousProject } from "./queries";
import { verificationValidationSchema } from "./validationSchemas";
import FormField from "../../components/FormField";

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
      <Box flexGrow={1}>
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
                <Icon icon="arrow-left" mr="xxs" width={20} />
                Back
              </Link>
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

              <Button size="l" type="submit" loading={formik.isSubmitting}>
                Submit Project
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
