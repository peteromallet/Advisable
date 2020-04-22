import * as Yup from "yup";
import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useParams, useLocation, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Icon, Box, Text, Button } from "@advisable/donut";
import TextField from "../../components/TextField";
import UPDATE from "./updateConsultation";

const validationSchema = Yup.object({
  topic: Yup.string().required("Please provide a topic"),
});

const Topic = ({ data, previousStepURL, nextStep }) => {
  const params = useParams();
  const location = useLocation();
  const [updateConsultation] = useMutation(UPDATE);

  if (!location.state?.consultationId) {
    return <Redirect to={previousStepURL(params)} />;
  }

  const initialValues = {
    topic: "",
  };

  const handleSubmit = async (values) => {
    await updateConsultation({
      variables: {
        input: {
          id: location.state.consultationId,
          topic: values.topic,
        },
      },
    });

    nextStep(params);
  };

  return (
    <Box padding={["m", "l"]}>
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
      >
        {(formik) => (
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
            <Button
              type="submit"
              width={["100%", "auto"]}
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
              suffix={<Icon icon="arrow-right" />}
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Topic;
