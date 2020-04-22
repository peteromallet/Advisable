import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useLocation, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Box, Text, Button } from "@advisable/donut";
import SEND from "./sendRequest";
import ScaleInput from "../../components/ScaleInput";

function Send({ data, nextStep }) {
  const params = useParams();
  const location = useLocation();
  const [send] = useMutation(SEND);

  const initialValues = {
    likelyToHire: null,
  };

  const handleSubmit = async (values) => {
    await send({
      variables: {
        input: {
          consultation: location.state.consultationId,
          ...values,
        },
      },
    });

    nextStep(params);
  };

  return (
    <Box padding={["m", "l"]}>
      <Text fontSize="s" fontWeight="medium" mb="xs" color="neutral.5">
        Step 5
      </Text>
      <Text
        mb="l"
        as="h2"
        fontSize="xxl"
        fontWeight="semibold"
        color="blue.8"
        letterSpacing="-0.025em"
      >
        If you're impressed by {data.specialist.firstName}, how likely are you
        to hire them as a freelancer?
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <Box mb="xl">
              <Field
                as={ScaleInput}
                name="likelyToHire"
                onChange={(v) => {
                  formik.setFieldValue("likelyToHire", v);
                }}
              />
            </Box>
            <Button type="submit" size="l" loading={formik.isSubmitting}>
              Request Consultation
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default Send;
