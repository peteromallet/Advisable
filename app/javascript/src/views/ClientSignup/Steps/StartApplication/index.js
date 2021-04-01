import React, { useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import queryString from "query-string";
import { useStartClientApplication } from "../../queries";
import { Formik, Form } from "formik";
import { useLocation, useHistory } from "react-router";
import SubmitButton from "src/components/SubmitButton";
import { useNotifications } from "src/components/Notifications";
import FormField from "src/components/FormField";
import { Input, Box, useBreakpoint } from "@advisable/donut";
import Loading from "src/components/Loading";
import { Title } from "../styles";

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
    { called, loading },
  ] = useStartClientApplication();
  const location = useLocation();
  const history = useHistory();
  const isMobile = useBreakpoint("m");
  const notifications = useNotifications();
  const queryParams = useMemo(
    () => queryString.parse(location.search, { decode: true }),
    [location.search],
  );

  const updateLocationState = useCallback(
    (params) => {
      history.replace({ ...location, state: { ...location.state, ...params } });
    },
    [history, location],
  );

  const handleStartApplication = useCallback(
    async function (values) {
      updateLocationState({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      });

      return await startClientApplication({
        variables: {
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            rid: queryParams.rid || null,
            utmMedium: queryParams.utm_medium || null,
            utmSource: queryParams.utm_source || null,
            utmCampaign: queryParams.utm_campaign || null,
          },
        },
      });
    },
    [updateLocationState, startClientApplication, queryParams],
  );

  // Check query params
  useEffect(() => {
    const { firstName, lastName, email } = queryParams;
    if (!called && firstName && lastName && email) {
      const valid = validationSchema.validateSync({
        firstName,
        lastName,
        email,
      });
      if (!valid) return;
      handleStartApplication(queryParams);
    }
  }, [queryParams, called, handleStartApplication]);

  if (loading) return <Loading />;

  // Formik
  const initialValues = {
    firstName: location.state?.firstName || queryParams.firstName || "",
    lastName: location.state?.lastName || queryParams.lastName || "",
    email: queryParams.email || "",
  };

  const handleSubmit = async (values) => {
    history.replace({ ...location, state: { ...location.state, ...values } });
    const res = await startClientApplication({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          rid: queryParams.rid || null,
          utmMedium: queryParams.utm_medium || null,
          utmSource: queryParams.utm_source || null,
          utmCampaign: queryParams.utm_campaign || null,
        },
      },
    });

    // Get errors
    const errorCodes = res.errors?.map((err) => err.extensions?.code);
    const nonCorporateEmail = errorCodes?.includes("nonCorporateEmail");
    const existingAccount = errorCodes?.includes("existingAccount");

    // Actions based on errors
    if (nonCorporateEmail) {
      history.push({
        pathname: "/clients/signup/email-not-allowed",
        state: { ...location.state },
      });
    }
    if (existingAccount) {
      notifications.notify(
        "You already have an account with the provided email",
      );
      history.push({ pathname: "/login" });
    }

    // Successful action
    let applicationId = res.data?.startClientApplication?.clientApplication?.id;
    history.push({
      pathname: "/clients/signup/about_your_company",
      state: { applicationId, ...location.state },
    });
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
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
