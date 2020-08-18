// Renders the login page
import React from "react";
import queryString from "query-string";
import { Redirect, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";
import { useMutation, useApolloClient } from "@apollo/client";
import { Box, Card, Text, Link, theme } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import useScrollRestore from "../../utilities/useScrollRestore";
import validationSchema from "./validationSchema";
import { SignupLinks, SignupLink } from "./styles";
import VIEWER from "../../graphql/queries/viewer";
import LOGIN from "./login";

const Login = ({ location }) => {
  useScrollRestore();
  const viewer = useViewer();
  const history = useHistory();
  const client = useApolloClient();
  const { t } = useTranslation();
  const [login] = useMutation(LOGIN);
  const queryParams = queryString.parse(location.search);

  if (viewer) {
    return <Redirect to="/" />;
  }

  const initialValues = {
    email: queryParams.email || "",
    password: "",
  };

  const handleSubmit = async (input, formikBag) => {
    const { data, errors } = await login({
      variables: { input },
    });

    const errorCode = errors.graphQLErrors?.[0]?.extensions?.code;

    if (errorCode) {
      formikBag.setState(errorCode);
      formikBag.setSubmitting(false);
      return;
    }

    const { from } = location.state || {
      from: { pathname: "/" },
    };

    await client.resetStore();
    history.replace(from);
  };

  return (
    <Box maxWidth={460} mx="auto" pt="xxl" pb="l">
      <Box textAlign="center" mb="l">
        <svg className="Logo" width={120} height={22} fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.854 7.104h4.734v14.064h-4.462v-1.524h-.06c-.966 1.179-2.352 1.783-4.101 1.783C2.895 21.427 0 18.493 0 14.15c0-4.314 2.925-7.334 6.754-7.334 1.598 0 3.015.604 4.07 1.783h.03V7.104zM7.93 17.487c1.718 0 3.135-1.323 3.135-3.337 0-1.927-1.356-3.336-3.105-3.336-1.81 0-3.166 1.352-3.166 3.336 0 1.985 1.296 3.336 3.136 3.336zM27.317 0h4.703v21.168h-4.462v-1.524h-.06c-.995 1.179-2.413 1.783-4.222 1.783-4.04 0-6.934-2.934-6.934-7.277 0-4.314 2.924-7.334 6.723-7.334 1.659 0 3.136.604 4.191 1.784h.06V0zM24.27 17.486c1.84 0 3.226-1.322 3.226-3.336 0-1.927-1.326-3.336-3.226-3.336-1.809 0-3.166 1.352-3.166 3.336 0 1.985 1.327 3.336 3.166 3.336zM43.055 7.104H48l-5.699 14.064h-4.28L32.29 7.104h4.915l2.925 8.686h.06l2.864-8.686zm7.749-1.696c-1.628 0-2.955-1.064-2.955-2.617S49.176.173 50.804.173c1.628 0 2.955 1.065 2.955 2.618s-1.327 2.617-2.955 2.617zm-2.352 15.76V7.104h4.674v14.064h-4.674zm11.397.287c-2.321 0-4.402-.69-6.06-2.1l2.231-3.019c1.236 1.122 2.472 1.61 3.86 1.61.874 0 1.326-.287 1.326-.805 0-.345-.452-.661-2.261-1.179-2.443-.748-4.613-1.927-4.613-4.688 0-2.732 2.442-4.458 5.547-4.458 2.171 0 3.83.575 5.548 1.783l-2.231 3.222c-1.055-.978-2.322-1.467-3.347-1.467-.392 0-1.025.144-1.025.719 0 .345.543.69 1.93 1.179 3.256 1.122 5.005 1.84 5.035 4.66 0 2.588-1.93 4.543-5.94 4.543zM76.432 7.104h4.734v14.064h-4.462v-1.524h-.06c-.966 1.179-2.353 1.783-4.101 1.783-4.07 0-6.965-2.934-6.965-7.277 0-4.314 2.924-7.334 6.754-7.334 1.598 0 3.015.604 4.07 1.783h.03V7.104zm-2.925 10.383c1.72 0 3.136-1.323 3.136-3.337 0-1.927-1.357-3.336-3.105-3.336-1.81 0-3.166 1.352-3.166 3.336 0 1.985 1.296 3.336 3.135 3.336zm18.121-10.67c3.83 0 6.724 3.02 6.724 7.333 0 4.343-2.895 7.277-6.935 7.277-1.84 0-3.256-.604-4.221-1.783h-.06v1.524h-4.493V0h4.734v8.6h.06c1.056-1.18 2.533-1.784 4.191-1.784zm-1.176 10.67c1.84 0 3.136-1.352 3.136-3.337 0-1.984-1.357-3.336-3.166-3.336-1.87 0-3.226 1.41-3.226 3.336 0 2.014 1.387 3.336 3.256 3.336zm8.955 3.681V0h4.673v21.168h-4.673zM120 14.006c0 .403-.06 1.036-.121 1.323h-10.01c.332 1.582 1.749 2.445 3.468 2.445 1.356 0 2.562-.575 3.557-1.697l2.503 2.675c-1.236 1.495-3.498 2.675-6.573 2.675-4.372 0-7.658-2.934-7.658-7.306 0-4.256 3.166-7.305 7.477-7.305 4.312 0 7.357 2.991 7.357 7.19zm-7.296-3.595c-1.418 0-2.533.806-2.835 2.273l5.518-.03c-.302-1.38-1.266-2.243-2.683-2.243z"
            fill={theme.colors.blue500}
          />
        </svg>
      </Box>
      <Card py="xl" px="xl">
        <Text
          as="h3"
          mb="xs"
          fontSize="28px"
          color="blue900"
          fontWeight="medium"
          letterSpacing="-0.03em"
        >
          Welcome back!
        </Text>
        <Text color="neutral600" mb="l">
          Please sign in to your account
        </Text>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <FormField
                name="email"
                marginBottom="m"
                placeholder="Email"
                label="Email Address"
              />
              <FormField
                type="password"
                name="password"
                label="Password"
                marginBottom="xl"
                placeholder="Password"
                labelHint={
                  <Link to="/reset_password">Forgot your password?</Link>
                }
              />
              <SubmitButton size="l" width="100%">
                Login
              </SubmitButton>
              {formik.status && (
                <Box
                  mt="s"
                  bg="red.0"
                  padding="s"
                  fontSize="s"
                  color="red.6"
                  borderRadius="12px"
                >
                  {t(`errors.${formik.status}`)}
                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Card>

      <Text
        mt="l"
        mb="s"
        fontSize="s"
        color="neutral.7"
        textAlign="center"
        fontWeight="medium"
        letterSpacing="-0.01em"
      >
        Don't have an account?
      </Text>
      <SignupLinks>
        <SignupLink to="/clients/signup">Apply to be a client</SignupLink>
        <SignupLink to="/freelancers/signup">
          Apply to be a specialist
        </SignupLink>
      </SignupLinks>
    </Box>
  );
};

export default Login;
