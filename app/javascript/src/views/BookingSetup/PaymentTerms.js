import React from "react";
import { object, boolean, string } from "yup";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form, Field } from "formik";
import { Card, Box, Text, Button, Radio, RadioGroup } from "@advisable/donut";
import TextField from "../../components/TextField";
import UPDATE_PAYMENT_METHOD from "./updateProjectPaymentMethod";

const validationSchema = object().shape({
  acceptTerms: boolean().oneOf(
    [true, false],
    "Please accept the payment terms",
  ),
  exceptionalTerms: string().when("acceptTerms", {
    is: false,
    then: string().required("Please outline your suggested terms."),
  }),
});

const PaymentTerms = ({ nextStep }) => {
  const [updatePaymentMethod] = useMutation(UPDATE_PAYMENT_METHOD);

  const handleSubmit = async (values) => {
    await updatePaymentMethod({
      variables: { input: values },
    });

    nextStep();
  };

  const initialValues = {
    acceptTerms: null,
    exceptionalTerms: "",
  };

  return (
    <Card p="l">
      <Text
        mb="xs"
        fontSize="xxl"
        color="neutral.8"
        fontWeight="bold"
        letterSpacing="-0.02em"
      >
        Payment Terms
      </Text>
      <Text color="neutral.7" lineHeight="s" mb="l">
        Please review and accept the payment terms outlined below.
      </Text>

      <Text fontSize="s" color="neutral.8" fontWeight="medium" mb="xxs">
        Fixed Projects
      </Text>
      <Text color="neutral.7" size="s" lineHeight="s">
        When working with specialist’s on a fixed project, we will automatically
        bill your selected payment method when you assign a task to them based
        on the quote they have provided.
      </Text>
      <Box width="100%" height={1} my="l" bg="neutral.1" />
      <Text color="neutral.8" fontSize="s" fontWeight="medium" mb="xxs">
        Flexible Projects
      </Text>
      <Text color="neutral.7" size="s" lineHeight="s">
        When working with specialist’s on a flexible basis, we will
        automatically bill your selected payment method 50% of the budgeted
        hours at the start of each month. The remaining 50% will be billed when
        the freelancer submits their timesheet at the end of the month.
      </Text>
      <Box width="100%" height={1} my="l" bg="neutral.1" />
      <Text color="neutral.7" size="s" lineHeight="s" mb="l">
        All payments are held in escrow by Advisable.com and not released to
        freelancers until you approve their completed task(s).
      </Text>

      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <RadioGroup mb="l">
              <Field
                as={Radio}
                type="radio"
                name="acceptTerms"
                label="I accept these payment terms"
                checked={formik.values.acceptTerms === true}
                onChange={() => formik.setFieldValue("acceptTerms", true)}
              />
              <Field
                as={Radio}
                type="radio"
                name="acceptTerms"
                checked={formik.values.acceptTerms === false}
                onChange={() => formik.setFieldValue("acceptTerms", false)}
                label="Request exceptional payment terms (not recommended)"
                description="This option may result in delays to your project commencement."
              />
            </RadioGroup>

            {formik.values.acceptTerms === false && (
              <Box mb="xl">
                <Field
                  multiline
                  as={TextField}
                  name="exceptionalTerms"
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
              size="l"
              type="submit"
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default PaymentTerms;
