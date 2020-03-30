import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field } from "formik";
import REQUEST_CONSULTATIONS from "./requestConsultations";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { Box, Link, Text, Card, RoundedButton, Icon } from "@advisable/donut";
import TextField from "../../../components/TextField";
import ScaleInput from "../../../components/ScaleInput";
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

  const handleSubmit = async (values) => {
    await requestConsultations({
      variables: {
        input: {
          specialists: location.state.freelancers,
          skill: data.search.skill.name,
          topic: values.topic,
          likelyToHire: values.likelyToHire,
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
      <Link.External
        mb="s"
        href="#"
        fontSize="l"
        fontWeight="medium"
        letterSpacing="-0.02em"
        onClick={history.goBack}
      >
        <Icon mr="2px" width={20} height={20} icon="arrow-left" />
        Back
      </Link.External>
      <Text
        mb="xs"
        fontSize="32px"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        What would you like to cover during this consultation?
      </Text>
      <Text fontSize="l" lineHeight="m" color="neutral800" mb="l">
        Please describe briefly what you'd like to cover in a 30-minute
        consultation. This is for us to share with freelancers when requesting
        their time.
      </Text>
      <Card padding="m">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
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
              <Box mb="l">
                <Text lineHeight="m" color="blue900" mb="xs">
                  If you are impressed by someone you speak to, how likely are
                  you to hire them as a freelancer?
                </Text>
                <Field
                  as={ScaleInput}
                  name="likelyToHire"
                  onChange={(v) => {
                    formik.setFieldValue("likelyToHire", v);
                  }}
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
