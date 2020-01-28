// Renders the form for selecting the billing cycle for a flexible booking.
import React from "react";
import { useMutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import { Box, Text, Radio, RoundedButton } from "@advisable/donut";
import UPDATE from "./updateBillingCycle";

const BillingCycleSelection = ({ application, onSuccess }) => {
  const [updateBillingCycle] = useMutation(UPDATE);

  const initialValues = {
    billingCycle: application.billingCycle || "Weekly",
  };

  const handleSubmit = async values => {
    await updateBillingCycle({
      variables: {
        input: {
          id: application.id,
          billingCycle: values.billingCycle,
        },
      },
    });

    onSuccess();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {formik => (
        <Form>
          <Text
            as="h3"
            mb="xs"
            fontSize="xxl"
            color="blue.9"
            fontWeight="semibold"
            letterSpacing="-0.01em"
          >
            Billing Cycle
          </Text>
          <Text
            mb="l"
            fontSize="l"
            lineHeight="m"
            color="neutral.8"
            letterSpacing="-0.01em"
          >
            How frequently do you want to submit your hours?
          </Text>
          <Box mb="m">
            <Field name="billingCycle" as={Radio} type="radio" value="Weekly">
              <Text fontWeight="medium" mb="xxs">
                Weekly - Friday (Recommended)
              </Text>
              <Text color="neutral.8" fontSize="s" lineHeight="s">
                In order to get paid, you’ll need to submit hours at the end of
                every week
              </Text>
            </Field>
          </Box>

          <Field name="billingCycle" as={Radio} type="radio" value="Monthly">
            <Text fontWeight="medium" mb="xxs">
              Monthly - Last Friday of every month
            </Text>
            <Text color="neutral.8" fontSize="s" lineHeight="s">
              In order to get paid, you’ll need to submit hours at the end of
              every month.
            </Text>
          </Field>

          <Box height={1} bg="neutral.2" my="l" />

          <Text fontSize="xs" lineHeight="xs" color="neutral.7" mb="l">
            Please note that we only bill the client when you submit your hours,
            so we highly recommend you submit your hours weekly to prevent long
            delays in you getting paid.
          </Text>

          <RoundedButton size="l" type="submit" loading={formik.isSubmitting}>
            Save Changes
          </RoundedButton>
        </Form>
      )}
    </Formik>
  );
};

BillingCycleSelection.defaultProps = {
  onSuccess: () => {},
};

export default BillingCycleSelection;
