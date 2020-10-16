import { useEffect, useState, useCallback } from "react";
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
import { motion } from "framer-motion";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string(),
  email: Yup.string()
    .email("Please provide a valid email address")
    .required("Please enter your company email address"),
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

  const updateLocationState = useCallback(
    (params) => {
      history.replace({ ...location, state: { ...location.state, ...params } });
    },
    [history, location],
  );

  // Check query params
  useEffect(() => {
    const queryStringParams =
      location.search && queryString.parse(location.search, { decode: true });
    queryStringParams &&
      !called &&
      validationSchema
        .validate(queryStringParams)
        .then(() => {
          // Valid query params. Start client application
          startClientApplication({
            variables: { input: { ...queryStringParams } },
          });
          updateLocationState({
            firstName: queryStringParams.firstName,
            lastName: queryStringParams.lastName,
            email: queryStringParams.email,
          });
        })
        .catch((err) => {
          // Not valid query string params. Clear them
          console.error("Your query params are not valid", err);
          history.push(location.pathname);
        });
  }, [called, history, location, startClientApplication, updateLocationState]);

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
      <motion.div exit>
        <Navigation
          emailNotAllowed={emailNotAllowed}
          existingAccount={existingAccount}
          called={called}
          applicationId={applicationId}
        />
        <Loading />
      </motion.div>
    );

  // Formik
  const initialValues = {
    firstName: location.state?.firstName || "",
    lastName: location.state?.lastName || "",
    email: "",
  };
  const handleSubmit = (values) => {
    updateLocationState({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    });
    startClientApplication({ variables: { input: { ...values } } });
  };

  return (
    <>
      <Navigation
        emailNotAllowed={emailNotAllowed}
        existingAccount={existingAccount}
        called={called}
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
                    placeholder="First name"
                    label="First name"
                  />
                </Box>
                <Box flex="1">
                  <FormField
                    as={Input}
                    name="lastName"
                    placeholder="Last name"
                    label="Last name"
                  />
                </Box>
              </Box>
              <Box mb="l">
                <FormField
                  isRequired
                  as={Input}
                  name="email"
                  placeholder="name@company.com"
                  label="Company email address"
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
