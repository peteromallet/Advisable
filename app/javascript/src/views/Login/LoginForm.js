import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import Divider from "src/components/Divider";
import queryString from "query-string";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";
import { useMutation, useApolloClient } from "@apollo/client";
import { Box, Stack, Card, Text, Link } from "@advisable/donut";
import VIEWER from "src/graphql/queries/getViewer.graphql";
import validationSchema from "./validationSchema";
import LOGIN from "./login.graphql";
import LoginWithGoogle from "./LoginWithGoogle";
import useViewer from "../../hooks/useViewer";
import Logo from "src/components/Logo";

export default function LoginForm() {
  const viewer = useViewer();
  const location = useLocation();
  const client = useApolloClient();
  const { t } = useTranslation();
  const [login] = useMutation(LOGIN);
  const queryParams = queryString.parse(location.search);

  const { from } = location.state || {
    from: { pathname: "/" },
  };

  if (viewer) {
    if (queryParams.redirect) {
      window.location.href = queryParams.redirect;
    } else {
      return <Redirect to={from} />;
    }
  }

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
    <Box
      pb="2"
      mx="auto"
      px={["6", "0"]}
      pt={["10", "80px"]}
      maxWidth={["100%", 460]}
    >
      <Box textAlign={["left", "center"]} mb={8}>
        <Logo />
      </Box>
      <Card
        p={["0", "10"]}
        elevation={["none", "m"]}
        variant={["ghost", "white"]}
        borderRadius="12px"
        marginBottom={6}
      >
        <Text
          mb="1"
          as="h3"
          fontSize="5xl"
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.06rem"
          textAlign="center"
        >
          Welcome Back!
        </Text>
        <Text
          mb="6"
          color="neutral700"
          letterSpacing="-0.01rem"
          textAlign="center"
        >
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
      </Card>

      <Box textAlign="center">
        <Text fontWeight="medium" mb={2}>
          Don&apos;t have an account?
        </Text>
        <Link fontSize="s" variant="underlined" to="/login/signup">
          Signup
        </Link>
      </Box>
    </Box>
  );
}
