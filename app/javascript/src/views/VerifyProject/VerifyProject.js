import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "react-apollo";
import { Text, Button, Box, NumberedList } from "@advisable/donut";
import Checkbox from "../../components/Checkbox";
import TextField from "../../components/TextField";
import VALIDATE_PROJECT from "./validateProject";
import createValidationSchema from "./validationSchema";

const VerifyProject = ({ project, match }) => {
  const [validate] = useMutation(VALIDATE_PROJECT);
  let contactName = project.contactFirstName;
  if (project.contactLastName) {
    contactName += ` ${project.contactLastName}`;
  }

  const handleSubmit = async values => {
    await validate({
      variables: {
        input: {
          id: match.params.id,
          email: values.email,
        },
      },
    });
  };

  return (
    <>
      <Text
        mb="s"
        as="h2"
        fontSize="xxl"
        color="blue.9"
        lineHeight="xl"
        fontWeight="semibold"
      >
        Verify {project.primarySkill} project with {project.specialist.name}
      </Text>
      <Text size="s" lineHeight="s">
        To validate this project, please enter your email address. This should
        be either:
      </Text>
      <NumberedList my="m" fontSize="xs">
        <NumberedList.Item>
          {project.clientName} corporate email address for {contactName}
        </NumberedList.Item>
        <NumberedList.Item>
          An email address associated with the personal LinkedIn account of{" "}
          {contactName}
        </NumberedList.Item>
      </NumberedList>
      <Text size="s" lineHeight="s" mb="m">
        We’ll then send the details to this email address for validation.
      </Text>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ email: "", accept: false }}
        validationSchema={createValidationSchema(
          project.specialist.name,
          contactName
        )}
      >
        {formik => (
          <Form>
            <Box mb="s">
              <TextField
                autoFocus
                type="email"
                name="email"
                label="Email Address"
                placeholder="Email Address"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.submitCount > 0 && formik.errors.email}
              />
            </Box>
            <Checkbox
              name="accept"
              value={formik.values.accept}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.accept}
              label="I consent to be contacted to verify this project at the above email address."
            />
            <Button
              mt="m"
              intent="success"
              appearance="primary"
              loading={formik.isSubmitting}
            >
              Send verification details
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default VerifyProject;
