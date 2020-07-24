import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import queryString from "query-string";
import { useStartClientApplication } from "../../queries";
import { Formik, Form } from "formik";
import { useLocation, useHistory, Redirect } from "react-router";
import SubmitButton from "../../../../components/SubmitButton";
import FormField from "src/components/FormField";
import { Text, Input, Stack, Box } from "@advisable/donut";
import Loading from "../../../../components/Loading";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Provide your First Name, please."),
  lastName: Yup.string(),
  email: Yup.string().email().required("Provide your email, please."),
});

function StartApplication({ RedirectToNextStep }) {
  const [startClientApplication, { error, data }] = useStartClientApplication();
  const location = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState();

  // Check query params
  useEffect(() => {
    const queryStringParams =
      location.search && queryString.parse(location.search, { decode: true });
    queryStringParams &&
      validationSchema
        .validate(queryStringParams)
        .then(() => {
          // Valid query params. Start client application
          startClientApplication({ variables: { ...queryStringParams } });
          setEmail(queryStringParams.email);
        })
        .catch((err) => {
          // Not valid query string params. Clear them
          console.error("Your query params are not valid", err);
          history.push(location.pathname);
        });
  }, [history, location.pathname, location.search, startClientApplication]);

  // Handle mutation errors
  const errorCodes = error?.graphQLErrors.map((err) => err.extensions?.code);
  const emailNotAllowed = errorCodes?.includes("emailNotAllowed");
  const existingAccount = errorCodes?.includes("existingAccount");
  if (existingAccount) return <Redirect push to="/login" />;
  if (emailNotAllowed)
    return <Redirect push to="/clients/signup/email-not-allowed" />;
  // Handle mutation data on response
  const applicationId = data?.startClientApplication?.clientApplication?.id;
  if (applicationId)
    return <RedirectToNextStep state={{ applicationId, email }} />;
  // Loading while handling query string
  if (location.search) return <Loading />;

  // Formik
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const handleSubmit = (values) => {
    startClientApplication({ variables: { ...values } });
    setEmail(values.email);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => (
        <>
          <Text
            as="h2"
            mb="m"
            color="blue800"
            fontSize="xxxl"
            lineHeight="xxxl"
            fontWeight="semibold"
            letterSpacing="-0.02em"
          >
            Start your application
          </Text>
          <Form>
            <Stack spacing="m" mb="l">
              <Box display="flex">
                <Box flex="1" mr="s">
                  <FormField
                    as={Input}
                    name="firstName"
                    placeholder="First Name"
                    label="First Name"
                  />
                </Box>
                <Box flex="1">
                  <FormField
                    as={Input}
                    name="lastName"
                    placeholder="Last Name"
                    label="Last Name"
                  />
                </Box>
              </Box>
              <FormField
                as={Input}
                name="email"
                placeholder="ospencer@umbrellacorp.com"
                label="Email"
              />
            </Stack>
            <SubmitButton>Continue</SubmitButton>
          </Form>
        </>
      )}
    </Formik>
  );
}

StartApplication.propTypes = {
  RedirectToNextStep: PropTypes.elementType,
};

export default StartApplication;
