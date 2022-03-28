import React from "react";
import { Navigate } from "react-router-dom";
import { useDialogState } from "reakit/Dialog";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Box, Card, Text, Button, Skeleton, Modal } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "../../../../components/Notifications";
import UpdatePaymentMethod from "../../../../components/UpdatePaymentMethod";
import InvoiceSettingsFields from "../../../../components/InvoiceSettingsFields";
import CardPaymentSettings from "./CardPaymentSettings";
import GET_PAYMENT_SETTINGS from "./getPaymentSettings";
import { UPDATE_INVOICE_SETTINGS } from "./queries";

const PaymentSettings = () => {
  const viewer = useViewer();
  const { notify } = useNotifications();
  const paymentMethodModal = useDialogState();
  const { data, loading, refetch } = useQuery(GET_PAYMENT_SETTINGS);
  const [updateInvoiceSettings] = useMutation(UPDATE_INVOICE_SETTINGS);

  if (!viewer.isTeamManager) {
    return <Navigate to="/settings" />;
  }

  const handleSubmit = async (values, formik) => {
    const { errors } = await updateInvoiceSettings({
      variables: {
        input: values,
      },
    });

    if (errors) {
      const code = errors[0].extensions.code;
      if (code === "INVALID_VAT") {
        formik.setFieldError("vatNumber", "VAT number is invalid");
      }
    } else {
      notify("Your payment preferences have been updated");
    }
  };

  let initialValues = {
    paymentMethod: data?.viewer?.projectPaymentMethod,
    name: data?.viewer?.invoiceSettings?.name || data?.viewer?.name,
    companyName:
      data?.viewer?.invoiceSettings?.companyName || data?.viewer?.companyName,
    billingEmail: data?.viewer?.invoiceSettings?.billingEmail || "",
    vatNumber: data?.viewer?.invoiceSettings?.vatNumber || "",
    address: {
      line1: data?.viewer?.invoiceSettings?.address?.line1 || "",
      line2: data?.viewer?.invoiceSettings?.address?.line2 || "",
      city: data?.viewer?.invoiceSettings?.address?.city || "",
      state: data?.viewer?.invoiceSettings?.address?.state || "",
      country:
        data?.viewer?.invoiceSettings?.address?.country ||
        data?.viewer?.country?.id,
      postcode: data?.viewer?.invoiceSettings?.address?.postcode || "",
    },
  };

  if (loading) {
    return (
      <Card p="l">
        <Skeleton width={120} height={20} mb="l" />
        <Skeleton height={16} mb="xs" />
        <Skeleton height={16} mb="xs" />
        <Skeleton width={200} height={16} mb="xs" />
      </Card>
    );
  }

  return (
    <Card p={10} borderRadius="12px">
      <Text
        mb="l"
        as="h1"
        fontSize="4xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.02rem"
      >
        Payment Preferences
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <CardPaymentSettings
              paymentMethod={data.viewer.paymentMethod}
              openCardModal={paymentMethodModal.show}
            />

            <Text
              mb={1}
              fontSize="l"
              fontWeight="medium"
              color="neutral900"
              letterSpacing="-0.02rem"
            >
              Invoice Settings
            </Text>
            <Text fontSize="s" color="neutral700" mb={6}>
              The information below will be used to generate your invoice
            </Text>

            <InvoiceSettingsFields formik={formik} />

            <Button loading={formik.isSubmitting}>Save Changes</Button>
          </Form>
        )}
      </Formik>

      <Modal
        modal={paymentMethodModal}
        padding={2}
        label="Update payment method"
      >
        <Box p="l">
          <UpdatePaymentMethod
            onSuccess={() => {
              paymentMethodModal.hide();
              refetch();
            }}
          />
        </Box>
      </Modal>
    </Card>
  );
};

export default PaymentSettings;
