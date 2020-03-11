import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Text, RoundedButton } from "@advisable/donut";
import { useMutation } from "react-apollo";
import ButtonGroup from "src/components/ButtonGroup";
import TextField from "../../../components/TextField";
import REQUEST_MORE_TIMES from "./requestMoreTimes";

export default function RequestMoreAvailability({
  onCancel,
  interviewID,
  clientName,
}) {
  const [requestMoreTimes, { loading }] = useMutation(REQUEST_MORE_TIMES);

  const initialValues = {
    availabilityNote: "",
  };

  const handleSubmit = async values => {
    return requestMoreTimes({
      variables: {
        input: {
          id: interviewID,
          availabilityNote: values.availabilityNote,
        },
      },
    });
  };

  return (
    <Box padding="l">
      <Text
        mb="xs"
        as="h3"
        fontSize="xxl"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        Request more availability
      </Text>
      <Text mb="l" lineHeight="m" color="neutral800">
        We will request more availability from {clientName} and let you know
        when they respond.
      </Text>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {formik => (
          <Form>
            <Box mb="l">
              <Field
                as={TextField}
                multiline
                name="availabilityNote"
                label="When suits for you?"
                placeholder="Please add a note on your availability"
              />
            </Box>
            <ButtonGroup fullWidth>
              <RoundedButton
                size="l"
                type="submit"
                variant="dark"
                loading={loading}
              >
                Request
              </RoundedButton>
              <RoundedButton
                type="button"
                variant="subtle"
                size="l"
                onClick={onCancel}
              >
                Cancel
              </RoundedButton>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
