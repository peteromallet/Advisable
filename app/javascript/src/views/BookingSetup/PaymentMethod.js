import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_INVOICE_SETTINGS } from "./queries";
import { Text, Card, Radio, RadioGroup } from "@advisable/donut";
import { Formik, Form, Field } from "formik";
import SubmitButton from "src/components/SubmitButton";
import { useHistory } from "react-router";

const PaymentMethod = ({ data }) => {
  const history = useHistory();
  const { application } = data;
  const [updateInvoiceSettings] = useMutation(UPDATE_INVOICE_SETTINGS);
  const hasPaymentMethod = data.viewer.paymentMethod;

  const initialValues = {
    paymentMethod: data.viewer.projectPaymentMethod || "Card",
  };

  const handleSubmit = async (values) => {
    await updateInvoiceSettings({
      variables: {
        input: {
          paymentMethod: values.paymentMethod,
        },
      },
    });

    if (values.paymentMethod === "Bank Transfer" || hasPaymentMethod) {
      history.push(`/book/${data.application.id}/invoice_settings`);
      return;
    }

    history.push(`/book/${data.application.id}/card_details`);
  };

  return (
    <Card padding="xl" borderRadius="12px">
      <Text
        mb={1}
        fontSize="4xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.04em"
      >
        Setup payments
      </Text>
      <Text color="neutral700" lineHeight="1.4" mb={8}>
        Before you start working with {application.specialist.firstName}, we
        need to know how to collect payment for them. Please select a payment
        method below.
      </Text>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <RadioGroup mb={8}>
            <Field
              as={Radio}
              type="radio"
              value="Card"
              name="paymentMethod"
              label="Payments via card"
              description="We will collect payment by charging your card"
            />
            <Field
              as={Radio}
              type="radio"
              value="Bank Transfer"
              name="paymentMethod"
              label="Payments via bank transfer"
              disabled={!data.currentCompany.bankTransfersEnabled}
              description="We will collect payment by sending you an invoice"
            />
          </RadioGroup>
          <SubmitButton size="l">Continue</SubmitButton>
        </Form>
      </Formik>
    </Card>
  );
};

export default PaymentMethod;
