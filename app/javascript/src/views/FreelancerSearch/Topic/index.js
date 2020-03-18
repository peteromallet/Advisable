import React from "react";
import { useMutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import REQUEST_CONSULTATIONS from "./requestConsultations";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { Box, Link, Text, Card, RoundedButton, Icon } from "@advisable/donut";
import TextField from "../../../components/TextField";
import validationSchema from "./validationSchema";

const Topic = ({ data }) => {
  const history = useHistory();
  const location = useLocation();
  const selected = location.state?.freelancers || [];
  const [requestConsultations] = useMutation(REQUEST_CONSULTATIONS);

  if (selected.length === 0) {
    return <Redirect to="/freelancer_search/results" />;
  }

  const initialValues = {
    topic: "",
  };

  const handleSubmit = async values => {
    await requestConsultations({
      variables: {
        input: {
          specialists: location.state.freelancers,
          skill: data.search.skill,
          topic: values.topic,
        },
      },
    });

    history.push({
      pathname: `/freelancer_search/${data.search.id}/sent`,
      state: null,
    });
  };

  return (
    <Box maxWidth={700} mx="auto">
      <Link
        mb="xs"
        to={{
          ...location,
          pathname: `/freelancer_search/${data.search.id}/availability`,
        }}
      >
        <Icon mr="xxs" width={16} height={16} icon="arrow-left" />
        Back
      </Link>
      <Text
        as="h1"
        mb="xs"
        color="blue.8"
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
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
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
                  error={formik.touched.topic && formik.errors.topic}
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
