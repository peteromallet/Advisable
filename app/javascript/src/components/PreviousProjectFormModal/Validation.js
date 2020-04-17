import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Text,
  Input,
  Label,
  Select,
  Stack,
  Link,
  Icon,
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
                to={`${modal.returnPath}/previous_projects/${data.previousProject.id}/portfolio`}
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
                <Box>
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
                <Box>
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
      <Box
        ml="50px"
        width={320}
        flexShrink={0}
        display={["none", "none", "none", "block"]}
      >
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
