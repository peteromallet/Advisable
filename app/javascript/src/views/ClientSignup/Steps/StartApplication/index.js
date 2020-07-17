import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";
import queryString from "query-string";
import { START_CLIENT_APPLICATION } from "../../queries";
import { Formik, Form } from "formik";
import { useLocation, useHistory } from "react-router";
import SubmitButton from "../../../../components/SubmitButton";
import FormField from "src/components/FormField";
import { Text, Input, Stack } from "@advisable/donut";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Provide your First Name, please."),
  lastName: Yup.string(),
  email: Yup.string().email().required("Provide your email, please."),
});

function StartApplication({ pushNextStepPath }) {
  const [startClientApplication, { error, data }] = useMutation(
    START_CLIENT_APPLICATION,
  );
  const location = useLocation();
  const history = useHistory();

  // Check query params
  useEffect(() => {
    const queryStringParams =
      location.search && queryString.parse(location.search);
    console.log("query string", queryStringParams);
    queryStringParams &&
      validationSchema
        .validate(queryStringParams)
        .then(() => {
          // Valid query params. Start client application
          startClientApplication({ variables: { ...queryStringParams } });
        })
        .catch((err) => {
          // Not valid query string params. Clear them
          console.error("Your query params are not valid", err);
          history.push(location.pathname);
        });
  }, [history, location.pathname, location.search, startClientApplication]);

  // Handle mutation errors
  useEffect(() => {
    error && history.push("/login");
  }, [error, history]);

  // Handle mutation data
  useEffect(() => {
    const applicationId = data?.startClientApplication.clientApplication.id;
    console.log("application id", applicationId);
    applicationId && pushNextStepPath({ state: { applicationId } });
  }, [data, pushNextStepPath]);

  // Formik
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const handleSubmit = (values) =>
    startClientApplication({ variables: { ...values } });

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
            color="blue.8"
            fontSize="xxxl"
            lineHeight="xxxl"
            fontWeight="semibold"
            letterSpacing="-0.02em"
          >
            Start your application
          </Text>
          <Form>
            <Stack spacing="m" mb="l">
              <FormField
                as={Input}
                name="firstName"
                placeholder="First Name"
                label="First Name"
              />
              <FormField
                as={Input}
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
              />
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
  pushNextStepPath: PropTypes.func,
};

export default StartApplication;
