import React from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { Card, Text, Box, Link } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useHistory, useLocation, useParams } from "react-router";
import { useLogin } from "src/views/Login/queries";
import { useCreateConsultation } from "./queries";

export default function Authenticate() {
  const [login] = useLogin();
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const [createConsultation] = useCreateConsultation();
  const { t } = useTranslation();

  const initialValues = {
    email: location.state?.email || "",
    password: "",
  };

  const handleSubmit = async (input, formik) => {
    const response = await login({
      variables: {
        input,
      },
    });

    if (response.errors) {
      const errorCode = response.errors?.[0]?.extensions?.code;
      formik.setStatus(t(`errors.${errorCode}`));
      formik.setSubmitting(false);
      return;
    }

    const consultationResponse = await createConsultation();
    const consultation =
      consultationResponse.data?.createConsultation.consultation;
    history.push({
      pathname: `/request_consultation/${params.specialistId}/availability`,
      state: {
        ...location.state,
        consultationId: consultation.id,
        completed: [...(location?.state?.completed || []), "SKILLS"],
      },
    });
  };

  return (
    <Card borderRadius="12px" padding={[4, 6, 8]}>
      <Text
        mb={2}
        as="h2"
        fontSize="4xl"
        fontWeight="600"
        color="neutral900"
        letterSpacing="-0.05rem"
      >
        Please login to your account
      </Text>
      <Text color="neutral800" lineHeight="1.3" mb={6}>
        It looks like you have an account with us. Please login to your account
        to continue your consultation request.
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <FormField
              name="email"
              marginBottom={2}
              placeholder="Email"
              aria-label="Email Address"
            />
            <FormField
              type="password"
              name="password"
              marginBottom={4}
              aria-label="Password"
              placeholder="Password"
            />
            <SubmitButton marginBottom={4}>Login</SubmitButton>
            <Box>
              <Link variant="dark" fontSize="xs" to="/reset_password">
                Forgot your password?
              </Link>
            </Box>
            {formik.status && (
              <Box
                mt="3"
                bg="red100"
                padding="3"
                fontSize="s"
                color="red600"
                borderRadius="12px"
              >
                {formik.status}
              </Box>
            )}
          </Form>
        )}
      </Formik>
    </Card>
  );
}
