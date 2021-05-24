import React, { useMemo, useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router";
import { motion } from "framer-motion";
import queryString from "query-string";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { Input, Box, useBreakpoint } from "@advisable/donut";
import Loading from "src/components/Loading";
import SubmitButton from "src/components/SubmitButton";
import { useNotifications } from "src/components/Notifications";
import FormField from "src/components/FormField";
import { Title } from "../styles";
import { useStartClientApplication } from "../../queries";
import MotionStack from "../MotionStack";

const validationSchema = object().shape({
  firstName: string().required("Please enter your first name"),
  lastName: string(),
  email: string()
    .email("Please provide a valid email address")
    .required("Please enter your company email address"),
});

function StartApplication() {
  const [startClientApplication, { called }] = useStartClientApplication();
  const location = useLocation();
  const history = useHistory();
  const isMobile = useBreakpoint("m");
  const notifications = useNotifications();
  const queryParams = useMemo(
    () => queryString.parse(location.search, { decode: true }),
    [location.search],
  );
  const hasQueryParams = useMemo(() => {
    const { firstName, lastName, email } = queryParams;
    return firstName && lastName && email;
  }, [queryParams]);

  const handleSubmit = useCallback(
    async (values) => {
      history.replace({ ...location, state: { ...location.state, ...values } });
      const res = await startClientApplication({
        variables: {
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            rid: values.rid || null,
            utmMedium: values.utm_medium || null,
            utmSource: values.utm_source || null,
            utmCampaign: values.utm_campaign || null,
          },
        },
      });

      // Get errors
      const errorCodes = res.errors?.map((err) => err.extensions?.code);
      const nonCorporateEmail = errorCodes?.includes("NON_CORPORATE_EMAIL");
      const existingAccount = errorCodes?.includes("EXISTING_ACCOUNT");

      // Actions based on errors
      if (nonCorporateEmail) {
        history.push({
          pathname: "/clients/signup/email-not-allowed",
          state: location.state,
        });
        return;
      }
      if (existingAccount) {
        notifications.notify(
          "You already have an account with the provided email",
        );
        history.push({ pathname: "/login" });
        return;
      }

      // Successful action
      let applicationId =
        res.data?.startClientApplication?.clientApplication?.id;
      history.push({
        pathname: "/clients/signup/about_your_company",
        state: { applicationId, ...location.state },
      });
    },
    [history, location, notifications, startClientApplication],
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
      handleSubmit(queryParams);
    }
  }, [queryParams, called, handleSubmit]);

  // Formik
  const initialValues = {
    firstName: location.state?.firstName || queryParams.firstName || "",
    lastName: location.state?.lastName || queryParams.lastName || "",
    email: queryParams.email || "",
  };

  if (hasQueryParams) {
    return (
      <motion.div exit>
        <Loading />
      </motion.div>
    );
  }

  return (
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
  );
}

export default StartApplication;
