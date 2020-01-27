import React from "react";
import * as Yup from "yup";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  Card,
  Text,
  Box,
  Radio,
  Checkbox,
  RoundedButton,
  Icon,
} from "@advisable/donut";
import UPDATE_APPLICATION from "./updateApplication";

const validationSchema = Yup.object().shape({
  accept: Yup.boolean().oneOf([true], "Please accept these terms"),
});

const BillingCycle = ({ application }) => {
  const history = useHistory();
  const [updateApplication] = useMutation(UPDATE_APPLICATION);

  const initialValues = {
    billingCycle: application.billingCycle || "Weekly",
    accept: false,
  };

  const handleSubmit = async values => {
    await updateApplication({
      variables: {
        input: {
          id: application.airtableId,
          billingCycle: values.billingCycle,
        },
      },
    });

    history.push(`/applications/${application.airtableId}/proposal/send`);
  };

  return (
    <Card padding="l">
      <Text as="h3" mb="xs" fontSize="xl" color="blue.9" fontWeight="semibold">
        Billing Cycle
      </Text>
      <Text mb="l" color="neutral.8" lineHeight="s">
        Please note that we only bill the client when you submit your hours, so
        we highly recommend you submit your hours weekly to prevent long delays
        in you getting paid
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form>
            <Box mb="m">
              <Field name="billingCycle" as={Radio} type="radio" value="Weekly">
                <Text fontWeight="medium" mb="xxs">
                  Weekly - Friday (Recommended)
                </Text>
                <Text color="neutral.8" fontSize="s">
                  In order to get paid, you’ll need to submit hours at the end
                  of every week
                </Text>
              </Field>
            </Box>

            <Field name="billingCycle" as={Radio} type="radio" value="Monthly">
              <Text fontWeight="medium" mb="xxs">
                Monthly - Last Friday of every month
              </Text>
              <Text color="neutral.8" fontSize="s">
                In order to get paid, you’ll need to submit hours at the end of
                every month.
              </Text>
            </Field>

            {formik.errors.billingCycle && (
              <Text color="red.5" fontSize="s" mt="m">
                {formik.errors.billingCycle}
              </Text>
            )}

            <Box height={1} bg="neutral.1" my="l" />

            <Field name="accept" type="checkbox" as={Checkbox}>
              I accept these terms
            </Field>

            {formik.submitCount > 0 && formik.errors.accept && (
              <Text color="red.5" fontSize="s" mt="xs" mb="m">
                {formik.errors.accept}
              </Text>
            )}

            <RoundedButton
              mt="l"
              type="submit"
              loading={formik.isSubmitting}
              suffix={<Icon icon="arrow-right" />}
            >
              Continue
            </RoundedButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default BillingCycle;
