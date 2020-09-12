import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { Card, Text, Button } from "@advisable/donut";
import InvoiceFields from "../../components/InvoiceSettingsFields";
import UPDATE_PAYMENT_METHOD from "./updateProjectPaymentMethod";

const InvoiceSettings = ({ nextStep }) => {
  const [updatePaymentMethod] = useMutation(UPDATE_PAYMENT_METHOD);

  const initialValues = {
    invoiceSettings: {
      name: "",
      companyName: "",
      billingEmail: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "",
        postcode: "",
      },
      vatNumber: "",
    },
  };

  const handleSubmit = async (values) => {
    await updatePaymentMethod({
      variables: {
        input: values,
      },
    });

    nextStep();
  };

  return (
    <Card padding="l">
      <Text
        mb="xs"
        fontSize="xxl"
        color="neutral800"
        fontWeight="bold"
        letterSpacing="-0.02em"
      >
        Invoice Settings
      </Text>
      <Text fontSize="m" color="neutral700" lineHeight="s" mb="l">
        Please provide the following information which will appear on your
        invoices.
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <InvoiceFields formik={formik} />
            <Button mt="m" size="l" type="submit" loading={formik.isSubmitting}>
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default InvoiceSettings;
