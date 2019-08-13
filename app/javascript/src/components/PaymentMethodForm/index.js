import React from "react";
import { get, flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { Box, Text } from "@advisable/donut";
import { Formik, Form } from "formik";
import TextField from "../TextField";
import useStripe from "../../hooks/useStripe";
import Button from "../Button";
import InputLabel from "../InputLabel";
import { Field } from "./styles";
import GET_VIEWER from "./getViewer";
import UPDATE_CUSTOMER from "./updateCustomer";
import validationSchema from "./validationSchema";

// Used to update a user's payment method. This component will always update
// the users stripe customer object with the provided name and email, however,
// it does not atomatically handle the card details. They must be processed by
// passing the handleCardDetails prop, which takes three arguments:
// - stripe: The stripe JS sdk
// - details: An object containing all of the form fields, including the stripe
// elements card.
// - formikBag: The formikBag from the underlying formik component.
const PaymentMethodForm = ({
  data,
  userId,
  buttonLabel,
  initialValues,
  updateCustomer,
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
  }, [data.loading]);

  const handleSubmit = async (values, formikBag) => {
    formikBag.setStatus(null);

    // Update the customer data first
    await updateCustomer({
      variables: {
        input: {
          user: userId,
          name: values.name,
          email: values.email,
        },
      },
    });

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
    name: get(data, "viewer.customer.name") || "",
    email: get(data, "viewer.customer.email") || "",
    cardholder: get(
      data,
      "viewer.paymentMethod.name",
      get(data, "viewer.name")
    ),
    ...initialValues,
  };

  if (data.loading) return <>loading...</>;

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={formikInitialValues}
    >
      {formik => (
        <Form>
          <Box mb="s">
            <TextField
              name="name"
              label="Company Name"
              value={formik.values.name}
              placeholder="Company Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Box mb="s">
            <TextField
              name="email"
              label="Email"
              placeholder="Email"
              value={formik.values.email}
              description="This is where we will send receipts and invoices"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box mb="s">
            <TextField
              name="cardholder"
              label="Cardholder Name"
              placeholder="Cardholder Name"
              value={formik.values.cardholder}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.cardholder && formik.errors.cardholder}
            />
          </Box>
          <InputLabel>Card Details</InputLabel>
          <Field ref={elementsRef} />
          <Button
            size="l"
            type="submit"
            styling="primary"
            loading={formik.isSubmitting}
            aria-label={buttonLabel || "Continue"}
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

export default compose(
  graphql(GET_VIEWER),
  graphql(UPDATE_CUSTOMER, { name: "updateCustomer" })
)(PaymentMethodForm);
