import React from "react";
import { useLocation } from "react-router-dom";
import Divider from "src/components/Divider";
import queryString from "query-string";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";
import { useMutation, useApolloClient } from "@apollo/client";
import { Box, Stack, Link } from "@advisable/donut";
import VIEWER from "src/graphql/queries/getViewer.graphql";
import validationSchema from "./validationSchema";
import LOGIN from "./login";
import LoginWithGoogle from "./LoginWithGoogle";

export default function LoginForm() {
  const location = useLocation();
  const client = useApolloClient();
  const { t } = useTranslation();
  const [login] = useMutation(LOGIN);
  const queryParams = queryString.parse(location.search);

  const initialValues = {
    email: queryParams.email || "",
    password: "",
  };

  const handleSubmit = async (input, formikBag) => {
    const { errors, data } = await login({
      variables: { input },
    });

    const errorCode = errors?.[0]?.extensions?.code;

    if (errorCode) {
      formikBag.setStatus(errorCode);
      formikBag.setSubmitting(false);
      return;
    }

    await client.resetStore();

    client.writeQuery({
      query: VIEWER,
      data: {
        viewer: data.login.viewer,
      },
    });
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
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
            <SubmitButton
              marginBottom={2}
              data-testid="loginButton"
              size="l"
              width="100%"
            >
              Login
            </SubmitButton>
            <Box textAlign="center" marginBottom={2}>
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
                {t(`errors.${formik.status}`)}
              </Box>
            )}
          </Form>
        )}
      </Formik>
      <Divider py={4}>Or</Divider>
      <Stack marginTop={2}>
        <LoginWithGoogle />
      </Stack>
    </>
  );
}
