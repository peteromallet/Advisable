import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Text,
  Input,
  Label,
  Select,
  Stack,
  InputError,
  RoundedButton,
} from "@advisable/donut";
import Helper from "./Helper";
import { usePublishPreviousProject } from "./queries";
import { verificationValidationSchema } from "./validationSchemas";

const RELATIONSHIPS = [
  "They managed the project",
  "They worked on the project with me",
  "They worked at the company but not the project",
];

export default function Validation({ data, modal }) {
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
      <Box flexGrow={1} pr="xl">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
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
              <Text lineHeight="m" color="neutral700" mb="l">
                We will need to confirm the details of this project with someone
                who worked on the project.
              </Text>
              <Stack mb="xl" spacing="xxl" divider="neutral100">
                <Box display="flex">
                  <Box pr="xs" width="50%">
                    <Label mb="xs">Contact Name</Label>
                    <Field
                      as={Input}
                      name="contactName"
                      placeholder="Contact Name"
                      error={
                        formik.touched.contactName && formik.errors.contactName
                      }
                    />
                    <ErrorMessage
                      mt="xs"
                      name="contactName"
                      component={InputError}
                    />
                  </Box>
                  <Box pl="xs" width="50%">
                    <Label mb="xs">Contact Job Title</Label>
                    <Field
                      as={Input}
                      name="contactJobTitle"
                      placeholder="Contact Job Title"
                      error={
                        formik.touched.contactJobTitle &&
                        formik.errors.contactJobTitle
                      }
                    />
                    <ErrorMessage
                      mt="xs"
                      name="contactJobTitle"
                      component={InputError}
                    />
                  </Box>
                </Box>
                <Box>
                  <Label mb="xs">
                    What was your relationship to them for this project?
                  </Label>
                  <Field as={Select} name="contactRelationship">
                    {RELATIONSHIPS.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </Field>
                </Box>
              </Stack>

              <RoundedButton
                size="l"
                type="submit"
                loading={formik.isSubmitting}
              >
                Publish Project
              </RoundedButton>
            </Form>
          )}
        </Formik>
      </Box>
      <Box width={320} flexShrink={0}>
        <Helper>
          <Helper.Text heading="What's this for?" mb="l">
            With your permission, Advisable will reach out to this contact to
            validate your performance on this project.
          </Helper.Text>
        </Helper>
      </Box>
    </Box>
  );
}
