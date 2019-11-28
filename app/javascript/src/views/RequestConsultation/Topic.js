import * as Yup from "yup";
import React from "react";
import { useMutation } from "react-apollo";
import { useParams, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Icon, Box, Text, RoundedButton } from "@advisable/donut";
import TextField from "../../components/TextField";
import REQUEST_CONSULTATION from "./requestConsultation";

const validationSchema = Yup.object({
  topic: Yup.string().required(),
});

const Topic = ({ data, nextStep }) => {
  const { specialistId } = useParams();
  const location = useLocation();
  const [requestConsultation] = useMutation(REQUEST_CONSULTATION);

  const initialValues = {
    topic: "",
  };

  const handleSubmit = async values => {
    await requestConsultation({
      variables: {
        input: {
          ...location.state,
          specialist: specialistId,
          topic: values.topic,
        },
      },
    });

    nextStep({ specialistId });
  };

  return (
    <>
      <Text fontSize="s" fontWeight="medium" mb="xs" color="neutral.5">
        Step 4
      </Text>
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        fontWeight="semibold"
        color="blue.8"
        letterSpacing="-0.025em"
      >
        What would you like to cover with {data.specialist.firstName} during
        this consultation?
      </Text>
      <Text color="neutral.8" lineHeight="s" mb="l">
        Please describe briefly what you'd like to cover in a 30-minute
        consultation with {data.specialist.firstName}. This is for us to share
        with {data.specialist.firstName} when requesting their time.
      </Text>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        isInitialValid={validationSchema.isValidSync(initialValues)}
      >
        {formik => (
          <Form>
            <Box mb="xl">
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
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
              suffix={<Icon icon="arrow-right" />}
            >
              Continue
            </RoundedButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Topic;
