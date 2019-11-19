import React from "react";
import { Box, Text, Button } from "@advisable/donut";
import { Formik, Form, Field } from "formik";
import TextField from "../TextField";
import useStripe from "../../hooks/useStripe";
import InputLabel from "../InputLabel";
import { Field as StyledField } from "./styles";
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
  const card = React.useRef(null);
  const elementsRef = React.useRef(null);

  React.useEffect(() => {
    if (!elementsRef.current) return;
    const elements = stripe.elements();
    card.current = elements.create("card");
    card.current.mount(elementsRef.current);
    return () => {
      if (card.current.unmount) {
        card.current.unmount();
      }
    };
  }, [stripe]);

  const handleSubmit = async (values, formikBag) => {
    formikBag.setStatus(null);

    await handleCardDetails(
      stripe,
      {
        ...values,
        card: card.current,
      },
      formikBag
    );

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
          <StyledField ref={elementsRef} />
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
