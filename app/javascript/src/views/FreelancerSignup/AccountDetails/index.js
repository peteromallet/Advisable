import React from "react";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Formik, Form } from "formik";
import queryString from "query-string";
import { useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Text, Box, Button } from "@advisable/donut";
import FormField from "components/FormField";
import VIEWER from "../../../graphql/queries/getViewer.graphql";
import validationSchema from "./validationSchema";
import CREATE_FREELANCER_ACCOUNT from "./createFreelancerAccount";

// Renders the first two steps of the signup flow.
const AccountDetails = ({ specialist, history, location }) => {
  const { t } = useTranslation();
  const skills = location.state?.skills || [];
  const [signup] = useMutation(CREATE_FREELANCER_ACCOUNT, {
    update(cache, response) {
      cache.writeQuery({
        query: VIEWER,
        data: { viewer: response.data.createFreelancerAccount.viewer },
      });
    },
  });

  // Redirect to the confirmation step if there is already a user logged in
  if (specialist) {
    return <Redirect to="/freelancers/signup/confirm" />;
  }

  // If there are no skills in the location state then redirect back to the
  // skills step so that the user can add them.
  if (skills.length === 0) {
    return <Redirect to="/freelancers/signup" />;
  }

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  };

  const handleSubmit = async (values, formik) => {
    const queryParams = queryString.parse(location.search);
    const { errors } = await signup({
      variables: {
        input: {
          ...values,
          skills,
          pid: queryParams?.pid,
          campaignName: queryParams?.utm_campaign,
          campaignSource: queryParams?.utm_source,
          referrer: queryParams?.rid,
        },
      },
    });

    if (errors) {
      let error = errors[0];
      let code = error?.extensions?.code;

      if (code === "emailTaken") {
        formik.setFieldError("email", t("errors.emailTaken"));
        formik.setSubmitting(false);
      }
    } else {
      history.replace("/freelancers/signup/confirm");
    }
  };

  return (
    <>
      <Text
        mb="s"
        as="h2"
        size="32px"
        lineHeight="34px"
        weight="semibold"
        color="blue900"
        letterSpacing="-0.02em"
      >
        Create your account
      </Text>
      <Text size="m" color="neutral700" lineHeight="m">
        Create your Advisable freelancer account below so that you can apply to
        client projects.
      </Text>
      <Box bg="neutral100" width="100%" height="1px" my="l" />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <Box display="flex" mb="s">
              <Box pr="xxs" flex={1}>
                <FormField
                  name="firstName"
                  label="First name"
                  placeholder="First name"
                />
              </Box>
              <Box pl="xxs" flex={1}>
                <FormField
                  name="lastName"
                  label="Last name"
                  placeholder="Last name"
                />
              </Box>
            </Box>
            <Box mb="s">
              <FormField
                type="tel"
                name="phone"
                label="Contact number"
                placeholder="Contact number"
              />
            </Box>
            <Box mb="s">
              <FormField
                type="email"
                name="email"
                label="Email Address"
                placeholder="Email address"
              />
            </Box>
            <FormField
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
            />
            <Box bg="neutral100" width="100%" height="1px" my="l" />
            <Button
              size="l"
              type="submit"
              suffix={<ArrowRight />}
              loading={formik.isSubmitting}
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AccountDetails;
