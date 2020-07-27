import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import queryString from "query-string";
import { useStartClientApplication, ABOUT_COMPANY_QUERY } from "../../queries";
import { Formik, Form } from "formik";
import { useLocation, useHistory } from "react-router";
import SubmitButton from "../../../../components/SubmitButton";
import FormField from "src/components/FormField";
import { Input, Box, useBreakpoint } from "@advisable/donut";
import Loading from "../../../../components/Loading";
import MotionStack from "../MotionStack";
import Navigation from "../Navigation";
import { Title } from "../styles";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Provide your First Name, please."),
  lastName: Yup.string(),
  email: Yup.string().email().required("Provide your email, please."),
});

function StartApplication() {
  const [
    startClientApplication,
    { error, data, client, called },
  ] = useStartClientApplication();
  const location = useLocation();
  const history = useHistory();
  const isMobile = useBreakpoint("m");
  const [applicationId, setApplicationId] = useState();
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
  useEffect(() => {
    const prefetchNextStep = async (id) => {
      await client.query({
        query: ABOUT_COMPANY_QUERY,
        variables: { id },
      });
      setApplicationId(id);
    };
    let applicationId = data?.startClientApplication?.clientApplication?.id;
    applicationId && prefetchNextStep(applicationId);
  }, [data, client]);

  if (location.search)
    return (
      <>
        <Navigation
          emailNotAllowed={emailNotAllowed}
          existingAccount={existingAccount}
          called={called}
          email={email}
          applicationId={applicationId}
        />
        <Loading />
      </>
    );

  // Formik
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const handleSubmit = (values) => {
    setEmail(values.email);
    startClientApplication({ variables: { ...values } });
  };

  return (
    <>
      <Navigation
        emailNotAllowed={emailNotAllowed}
        existingAccount={existingAccount}
        called={called}
        email={email}
        applicationId={applicationId}
      />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <MotionStack>
              <Title mb="m">Start Your Application</Title>
              <Box display={isMobile ? "block" : "flex"} mb="s">
                <Box flex="1" mr={!isMobile && "s"} mb={isMobile && "s"}>
                  <FormField
                    isRequired
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
              <Box mb="l">
                <FormField
                  isRequired
                  as={Input}
                  name="email"
                  placeholder="ospencer@umbrellacorp.com"
                  label="Email"
                />
              </Box>
              <SubmitButton width={[1, "auto"]}>Continue</SubmitButton>
            </MotionStack>
          </Form>
        )}
      </Formik>
    </>
  );
}

StartApplication.propTypes = {
  RedirectToNextStep: PropTypes.elementType,
  redirectToNextStep: PropTypes.func,
};

export default StartApplication;
