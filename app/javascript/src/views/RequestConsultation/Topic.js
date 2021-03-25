import { object, string } from "yup";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import React from "react";
import { useParams, useLocation, Redirect, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { Card, Box, Text, Button, Textarea } from "@advisable/donut";
import FormField from "../../components/FormField";
import { useUpdateConsultation } from "./queries";

const validationSchema = object({
  topic: string().required("Please provide a topic"),
});

const Topic = ({ data }) => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const [updateConsultation] = useUpdateConsultation();

  if (!location.state?.consultationId) {
    return (
      <Redirect
        to={{
          pathname: `/request_consultation/${params.specialistId}/skills`,
          state: location.state,
        }}
      />
    );
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

    history.push({
      pathname: `/request_consultation/${params.specialistId}/send`,
      state: {
        ...location.state,
        completed: [...(location?.state?.completed || []), "TOPIC"],
      },
    });
  };

  return (
    <Card borderRadius="12px" padding={[4, 6, 8]}>
      <Text
        mb={2}
        as="h2"
        fontSize="4xl"
        fontWeight="600"
        color="neutral900"
        letterSpacing="-0.05rem"
      >
        What would you like to cover with {data.specialist.firstName} during
        this consultation?
      </Text>
      <Text color="neutral800" lineHeight="1.3" mb={8}>
        Please describe briefly what you&apos;d like to cover in a 30-minute
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
              <FormField
                autoFocus
                minRows={6}
                name="topic"
                as={Textarea}
                placeholder="What would you like to talk about..."
              />
            </Box>
            <Button
              type="submit"
              width={["100%", "auto"]}
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
              suffix={<ArrowRight />}
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Topic;
