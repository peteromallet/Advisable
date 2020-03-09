import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Text, Button, theme } from "@advisable/donut";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CardField } from "./styles";
import TextField from "../TextField";
import InputLabel from "../InputLabel";
import validationSchema from "./validationSchema";

// Used to update a user's payment method. It does not atomatically handle the
// card details. They must be processed by passing the handleCardDetails prop,
// which takes three arguments:
// - stripe: The stripe JS sdk
// - details: An object containing all of the form fields, including the stripe
// elements card.
// - formikBag: The formikBag from the underlying formik component.
const PaymentMethodForm = ({
  buttonLabel,
  initialValues,
  handleCardDetails,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (values, formikBag) => {
    formikBag.setStatus(null);
    const card = elements.getElement(CardElement);
    await handleCardDetails(stripe, { ...values, card }, formikBag);
    formikBag.setSubmitting(false);
  };

  const formikInitialValues = {
    cardholder: "",
    ...initialValues,
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={formikInitialValues}
    >
      {formik => (
        <Form>
          <Box mb="s">
            <Field
              as={TextField}
              name="cardholder"
              label="Cardholder Name"
              placeholder="Cardholder Name"
              error={formik.touched.cardholder && formik.errors.cardholder}
            />
          </Box>
          <InputLabel>Card Details</InputLabel>
          <CardField>
            <CardElement
              options={{
                style: {
                  base: {
                    iconColor: theme.colors.neutral600,
                    color: theme.colors.neutral900,
                    fontSize: "16px",
                  },
                  invalid: {
                    iconColor: theme.colors.red600,
                    color: theme.colors.red600,
                  },
                },
              }}
            />
          </CardField>
          <Button
            size="l"
            width="100%"
            type="submit"
            intent="success"
            appearance="primary"
            loading={formik.isSubmitting}
          >
            {buttonLabel || "Continue"}
          </Button>
          {formik.status && (
            <Text size="s" color="red.8" mt="m">
              {formik.status}
            </Text>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PaymentMethodForm;
