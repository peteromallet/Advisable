import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Button, Label, theme, InputError } from "@advisable/donut";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CardField } from "./styles";
import FormField from "../FormField";
import validationSchema from "./validationSchema";

// Used to update a user's payment method. It does not atomatically handle the
// card details. They must be processed by passing the handleCardDetails prop,
// which takes three arguments:
// - stripe: The stripe JS sdk
// - details: An object containing all of the form fields, including the stripe
// elements card.
// - formikBag: The formikBag from the underlying formik component.
const PaymentMethodForm = ({
  loading,
  buttonLabel,
  initialValues,
  handleCardDetails,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (values, formikBag) => {
    formikBag.setStatus(null);
    formikBag.setFieldError("card", null);
    const card = elements.getElement(CardElement);
    await handleCardDetails(stripe, { ...values, card }, formikBag);
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
      {(formik) => (
        <Form>
          <FormField
            size="sm"
            marginBottom="4"
            name="cardholder"
            label="Cardholder Name"
            placeholder="Cardholder Name"
          />
          <Box mb="8">
            <Label marginBottom="2">Card Details</Label>
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
            {formik.errors.card && (
              <InputError mt="2">{formik.errors.card}</InputError>
            )}
          </Box>
          <Button
            size="l"
            type="submit"
            loading={loading || formik.isSubmitting}
          >
            {buttonLabel || "Continue"}
          </Button>
          {formik.status && (
            <Text size="s" color="red800" mt="m">
              {formik.status}
            </Text>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PaymentMethodForm;
