import React from "react";
import { Box, Text, Card, RoundedButton, Icon } from "@advisable/donut";
import { Formik, Form, Field } from "formik";
import TextField from "../../../components/TextField";
import { useMutation } from "react-apollo";
import { useLocation, useHistory, Redirect } from "react-router-dom";

const Topic = () => {
  const history = useHistory();
  const location = useLocation();
  const selected = location.state?.freelancers || [];

  if (selected.length === 0) {
    return <Redirect to="/freelancer_search/results" />;
  }

  const initialValues = {
    topic: "",
  };

  const handleSubmit = async values => {};

  return (
    <Box maxWidth={700} mx="auto">
      <Text
        as="h1"
        mb="xs"
        color="blue.9"
        fontSize="xxl"
        fontWeight="bold"
        letterSpacing="-0.02em"
      >
        What would you like to cover during this consultation?
      </Text>
      <Text lineHeight="s" color="neutral.8" mb="l">
        Please describe briefly what you'd like to cover in a 30-minute
        consultation. This is for us to share with the freelancers when
        requesting their time.
      </Text>
      <Card padding="m">
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {formik => (
            <Form>
              <Box mb="l">
                <Field
                  autoFocus
                  multiline
                  minRows={6}
                  name="topic"
                  as={TextField}
                  placeholder="What would you like to talk about..."
                />
              </Box>
              <RoundedButton
                type="submit"
                width={["100%", "auto"]}
                loading={formik.isSubmitting}
                suffix={<Icon icon="arrow-right" />}
              >
                Request Consultation
              </RoundedButton>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default Topic;
