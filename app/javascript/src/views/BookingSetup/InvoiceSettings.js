import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";
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
      address: {},
      vatNumber: "",
    },
  };

  const handleSubmit = async (values, formik) => {
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
        color="neutral.8"
        fontWeight="bold"
        letterSpacing="-0.02em"
      >
        Invoice Settings
      </Text>
      <Text fontSize="m" color="neutral.7" lineHeight="s" mb="l">
        Please provide the following information which will appear on your
        invoices.
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <InvoiceFields formik={formik} />
            <Button
              mt="m"
              size="l"
              type="submit"
              intent="success"
              appearance="primary"
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

export default InvoiceSettings;
