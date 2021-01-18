import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { Card, Text, Button } from "@advisable/donut";
import { useHistory, useParams } from "react-router-dom";
import InvoiceFields from "../../components/InvoiceSettingsFields";
import UPDATE_PAYMENT_METHOD from "./updateProjectPaymentMethod";

const InvoiceSettings = ({ data }) => {
  const history = useHistory();
  const { applicationId } = useParams();
  const [updatePaymentMethod] = useMutation(UPDATE_PAYMENT_METHOD);
  const { viewer } = data;

  const initialValues = {
    invoiceSettings: {
      name: viewer.invoiceSettings?.name || viewer.name || "",
      companyName:
        viewer.invoiceSettings?.companyName || viewer?.company?.name || "",
      billingEmail: viewer.invoiceSettings.email || viewer.email || "",
      address: {
        line1: viewer.invoiceSettings?.address?.line1 || "",
        line2: viewer.invoiceSettings?.address?.line2 || "",
        city: viewer.invoiceSettings?.address?.city || "",
        state: viewer.invoiceSettings?.address?.state || "",
        country: viewer.invoiceSettings?.address?.country || "",
        postcode: viewer.invoiceSettings?.address?.postcode || "",
      },
      vatNumber: viewer.invoiceSettings?.vatNumber || "",
    },
  };

  const handleSubmit = async (values) => {
    await updatePaymentMethod({
      variables: {
        input: values,
      },
    });

    history.push(`/book/${applicationId}/payment_terms`);
  };

  return (
    <Card padding={8} borderRadius="12px">
      <Text
        mb={1}
        fontSize="4xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.04em"
      >
        Invoice settings
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
