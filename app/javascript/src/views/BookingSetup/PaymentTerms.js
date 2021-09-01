import React from "react";
import { object, boolean, string } from "yup";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import {
  Card,
  Box,
  Text,
  Button,
  Radio,
  RadioGroup,
  Textarea,
} from "@advisable/donut";
import FormField from "../../components/FormField";
import { ACCEPT_PROJECT_PAYMENT_TERMS } from "./queries";
import { useHistory } from "react-router";

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

const PaymentTerms = ({ data }) => {
  const history = useHistory();
  const [acceptPaymentTerms] = useMutation(ACCEPT_PROJECT_PAYMENT_TERMS);

  const handleSubmit = async (values) => {
    await acceptPaymentTerms({
      variables: {
        input: {
          exceptionalTerms: values.exceptionalTerms,
        },
      },
    });

    history.push(`/book/${data.application.id}/booking_type`);
  };

  const initialValues = {
    acceptTerms: undefined,
    exceptionalTerms: "",
  };

  return (
    <Card p={8} borderRadius="12px">
      <Text
        mb={1}
        fontSize="4xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.04em"
      >
        Payment Terms
      </Text>
      <Text color="neutral700" lineHeight="s" mb="l">
        Please review and accept the payment terms outlined below.
      </Text>

      <Text color="neutral900" fontWeight="medium" mb={1}>
        Fixed Projects
      </Text>
      <Text color="neutral700" size="s" lineHeight="s">
        When working with specialist’s on a fixed project, we will automatically
        bill your selected payment method when you assign a task to them based
        on the quote they have provided.
      </Text>
      <Box width="100%" height={1} my="l" bg="neutral100" />
      <Text color="neutral900" fontWeight="medium" mb={1}>
        Flexible Projects
      </Text>
      <Text color="neutral700" size="s" lineHeight="s">
        When working with specialist’s on a flexible basis, we will
        automatically bill your selected payment method when approving a task.
      </Text>
      <Box width="100%" height={1} my="l" bg="neutral100" />
      <Text color="neutral700" size="s" lineHeight="s" mb="l">
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
              <FormField
                as={Textarea}
                marginBottom="xl"
                name="exceptionalTerms"
                label="What payment terms do you suggest?"
                placeholder="What payment terms do you suggest?"
                description="Please outline the precise payment method and terms you wish to receive and the reason why. Please include a phone number so an account manager can contact you to discuss your request. Note that while Advisable endeavour to facilitate custom terms, we do so only in exceptional circumstances."
              />
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
