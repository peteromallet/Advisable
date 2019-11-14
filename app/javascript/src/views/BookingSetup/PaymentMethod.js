import React from "react";
import { useMutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import {
  Card,
  Box,
  Text,
  Radio,
  RadioGroup,
  Button,
  Link,
} from "@advisable/donut";
import UPDATE_PAYMENT_METHOD from "./updateProjectPaymentMethod";

const PaymentMethod = ({ data, nextStep }) => {
  const [updatePaymentMethod] = useMutation(UPDATE_PAYMENT_METHOD);
  const specialist = data.application.specialist;

  const initialValues = {
    paymentMethod: data.viewer.projectPaymentMethod || "",
  };

  const handleSubmit = async (values, formik) => {
    await updatePaymentMethod({
      variables: {
        input: {
          paymentMethod: values.paymentMethod,
        },
      },
    });

    nextStep();
  };

  return (
    <Card>
      <Box padding="l">
        <Text
          mb="xxs"
          fontSize="xxl"
          color="neutral.8"
          fontWeight="bold"
          letterSpacing="-0.02em"
        >
          Setup Payments
        </Text>
        <Text mb="s" fontSize="l" lineHeight="s" color="neutral.7">
          It look’s like you haven’t added a project payment method yet
        </Text>
        <Text color="neutral.7" lineHeight="s" mb="l">
          Before you start working with {specialist.firstName}, we need to know
          how to collect payment for them. Please select your preferred project
          payment method below.
        </Text>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {formik => (
            <Form>
              <RadioGroup mb="l">
                <Field
                  as={Radio}
                  type="radio"
                  name="paymentMethod"
                  label="Payments with Card"
                  value="Card"
                  description="We will collect payment by charging your card"
                />
                <Field
                  as={Radio}
                  type="radio"
                  name="paymentMethod"
                  label="Pay via bank transfer"
                  value="Bank Transfer"
                  disabled={!data.viewer.bankTransfersEnabled}
                  description="We will collect payment via invoice"
                />
              </RadioGroup>
              {!data.viewer.bankTransfersEnabled && (
                <Text fontSize="xs" color="neutral.7" mb="l" lineHeight="s">
                  Please contact{" "}
                  <Link.External href="mailto:payments@advisable.com">
                    payments@advisable.com
                  </Link.External>{" "}
                  to enable bank transfers for larger payments.
                </Text>
              )}
              <Button
                size="l"
                type="submit"
                intent="success"
                appearance="primary"
                iconRight="arrow-right"
                loading={formik.isSubmitting}
              >
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Card>
  );
};

export default PaymentMethod;
