import React from "react";
import { graphql } from "react-apollo";
import { Formik, Form } from "formik";
import Radio from "../../../components/Radio";
import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import { Card, Box, Link, Text } from "@advisable/donut";
import { paymentTermsValidation } from "./validationSchema";
import UPDATE_PROJECT_PAYMENT_METHOD from "./updateProjectPaymentMethod";

const PaymentTerms = ({ updateProjectPaymentMethod, values }) => {
  const handleSubmit = async formikValues => {
    let input = {
      ...values,
      ...formikValues,
    };

    await updateProjectPaymentMethod({
      variables: {
        input,
      },
    });
  };

  let initialValues = {
    acceptTerms: undefined,
    exceptionalTerms: "",
  };

  return (
    <Card>
      <Box p="l">
        <Link mb="m" to="payment_details" replace>
          ← Back
        </Link>
        <Text pb="xs" size="xl" lineHeight="s" color="blue.8" weight="medium">
          Payment Terms
        </Text>
        <Text size="xs" color="neutral.5" lineHeight="xs" mb="l">
          Please review and accept the payment terms outlined below.
        </Text>

        <Text size="s" color="neutral.8" weight="medium" mb="xxs">
          Fixed Projects
        </Text>
        <Text color="neutral.6" size="xs" lineHeight="s">
          When working with specialist’s on a fixed project, we will
          automatically bill your selected payment method when you assign a task
          to them based on the quote they have provided.
        </Text>
        <Box width="100%" height={1} my="l" bg="neutral.1" />
        <Text color="neutral.8" size="s" weight="medium" mb="xxs">
          Flexible Projects
        </Text>
        <Text color="neutral.6" size="xs" lineHeight="s">
          When working with specialist’s on a flexible basis, we will
          automatically bill your selected payment method 50% of the budgeted
          hours at the start of each month. The remaining 50% will be billed
          when the freelancer submits their timesheet at the end of the month.
        </Text>
        <Box width="100%" height={1} my="l" bg="neutral.1" />
        <Text color="neutral.6" size="xs" lineHeight="s" mb="l">
          All payments are held in escrow by Advisable.com and not released to
          freelancers until you approve their completed task(s).
        </Text>

        <Formik
          isInitialValid={false}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={paymentTermsValidation}
        >
          {formik => (
            <Form>
              <Box mb="s">
                <Radio
                  name="acceptTerms"
                  onChange={() => formik.setFieldValue("acceptTerms", true)}
                  checked={formik.values.acceptTerms === true}
                  label="I accept these payment terms"
                />
              </Box>
              <Box mb="l">
                <Radio
                  name="acceptTerms"
                  onChange={() => formik.setFieldValue("acceptTerms", false)}
                  checked={formik.values.acceptTerms === false}
                  label="Request exceptional payment terms (not recommended)"
                  description="This option may result in delays to your project commencement."
                />
              </Box>

              {formik.values.acceptTerms === false && (
                <Box mb="l">
                  <TextField
                    multiline
                    name="exceptionalTerms"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.exceptionalTerms}
                    label="What payment terms do you suggest?"
                    placeholder="What payment terms do you suggest?"
                    description="Please outline the precise payment method and terms you wish to receive and the reason why. Please include a phone number so an account manager can contact you to discuss your request. Note that while Advisable endeavour to facilitate custom terms, we do so only in exceptional circumstances."
                    error={
                      formik.touched.exceptionalTerms &&
                      formik.errors.exceptionalTerms
                    }
                  />
                </Box>
              )}
              <Button
                block
                size="l"
                styling="primary"
                isLoading={formik.isSubmitting}
                disabled={!formik.isValid}
              >
                Complete Setup
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Card>
  );
};

export default graphql(UPDATE_PROJECT_PAYMENT_METHOD, {
  name: "updateProjectPaymentMethod",
})(PaymentTerms);
