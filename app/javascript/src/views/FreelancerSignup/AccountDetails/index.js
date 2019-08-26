import React from "react";
import { get } from "lodash";
import { Formik, Form } from "formik";
import { useMutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import { Text, Box, Button } from "@advisable/donut";
import queryString from "query-string";
import useViewer from "../../../hooks/useViewer";
import VIEWER from "../../../graphql/queries/viewer";
import TextField from "../../../components/TextField";
import validationSchema from "./validationSchema";
import CREATE_FREELANCER_ACCOUNT from "./createFreelancerAccount";

// Renders the first two steps of the signup flow.
const AccountDetails = ({ history, location }) => {
  const viewer = useViewer();
  const skills = get(location.state, "skills") || [];
  const [signup] = useMutation(CREATE_FREELANCER_ACCOUNT, {
    update(cache, response) {
      cache.writeQuery({
        query: VIEWER,
        data: { viewer: response.data.createFreelancerAccount.viewer },
      });
    },
  });

  // Redirect to the confirmation step if there is already a user logged in
  if (Boolean(viewer)) {
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
    password: "",
  };

  const handleSubmit = async values => {
    const queryParams = queryString.parse(location.search);
    const response = await signup({
      variables: {
        input: {
          ...values,
          skills,
          pid: get(queryParams, "pid"),
          campaignName: get(queryParams, "utm_campaign"),
          campaignSource: get(queryParams, "utm_source"),
          referrer: get(queryParams, "rid"),
        },
      },
    });

    if (response.errors) {
      console.log(response);
    }

    const token = response.data.createFreelancerAccount.token;
    window.localStorage.setItem("authToken", token);
    history.replace("/freelancers/signup/confirm");
  };

  return (
    <>
      <Text as="h2" size="xxxl" weight="semibold" color="blue.9" mb="s">
        Create your account
      </Text>
      <Text size="s" color="neutral.5" lineHeight="m">
        Create your Advisable freelancer account below.
      </Text>
      <Box bg="neutral.0" width="100%" height="1px" my="l" />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form>
            <Box display="flex" mb="s">
              <Box pr="xxs" flex={1}>
                <TextField
                  name="firstName"
                  label="First name"
                  placeholder="First name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  error={formik.touched.firstName && formik.errors.firstName}
                />
              </Box>
              <Box pl="xxs" flex={1}>
                <TextField
                  name="lastName"
                  label="Last name"
                  placeholder="Last name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  error={formik.touched.lastName && formik.errors.lastName}
                />
              </Box>
            </Box>
            <Box mb="s">
              <TextField
                type="email"
                name="email"
                label="Email Address"
                placeholder="Email address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
              />
            </Box>
            <TextField
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
            />
            <Box bg="neutral.0" width="100%" height="1px" my="l" />
            <Button
              size="l"
              type="submit"
              intent="success"
              appearance="primary"
              iconRight="arrow-right"
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
