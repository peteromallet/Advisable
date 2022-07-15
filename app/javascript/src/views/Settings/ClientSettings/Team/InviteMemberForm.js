import React from "react";
import { object, string } from "yup";
import { useTranslation } from "react-i18next";
import { Box, Text, Columns, Toggle } from "@advisable/donut";
import { Send } from "@styled-icons/ionicons-solid/Send";
import { Formik, Form, Field } from "formik";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useCreateUserForCompany } from "./queries";

const validationSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().required("Email is required").email("Invalid email"),
});

export default function InviteMemberForm({ company, onInvite = () => {} }) {
  const { t } = useTranslation();
  const [invite] = useCreateUserForCompany(company);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    teamManager: false,
  };

  const handleSubmit = async (values, formik) => {
    const { data, errors } = await invite({
      variables: {
        input: values,
      },
    });

    if (errors) {
      const errorCode = errors?.[0]?.extensions?.code;
      formik.setStatus(errorCode);
      formik.setSubmitting(false);
    } else {
      onInvite(data.createUserForCompany.user);
    }
  };

  return (
    <>
      <Text fontSize="2xl" fontWeight="medium" color="neutral900" mb={2}>
        Invite new member
      </Text>
      <Text lineHeight="18px" color="neutral700" marginBottom={8}>
        Enter the name and email of the person you want to invite to your team
      </Text>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {(formik) => (
          <Form>
            <Columns spacing={4} marginBottom={4}>
              <Columns.Column>
                <FormField name="firstName" label="First Name" />
              </Columns.Column>
              <Columns.Column>
                <FormField name="lastName" label="Last Name" />
              </Columns.Column>
            </Columns>
            <FormField name="email" label="Email Address" marginBottom={6} />
            <Box
              mb={8}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box maxWidth="320px">
                <Text fontWeight="medium" mb={1}>
                  Team Manager
                </Text>
                <Text fontSize="xs" color="neutral600">
                  Managers can invite other team members and manage company
                  settings
                </Text>
              </Box>
              <Field name="teamManager" as={Toggle} />
            </Box>
            <SubmitButton prefix={<Send />} disableUntilValid>
              Send Invite
            </SubmitButton>
            {formik.status && (
              <Box
                mt="3"
                bg="red100"
                padding="3"
                fontSize="s"
                color="red600"
                borderRadius="12px"
              >
                {t(`errors.${formik.status}`)}
              </Box>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}
