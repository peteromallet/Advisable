import React from "react";
import { get } from "lodash-es";
import { Redirect } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Card,
  Text,
  Button,
  Skeleton,
  Radio,
  RadioGroup,
} from "@advisable/donut";
import Modal from "../../../../components/Modal";
import useViewer from "src/hooks/useViewer";
import { useNotifications } from "../../../../components/Notifications";
import UpdatePaymentMethod from "../../../../components/UpdatePaymentMethod";
import InvoiceSettingsFields from "../../../../components/InvoiceSettingsFields";
import CardPaymentSettings from "./CardPaymentSettings";
import GET_PAYMENT_SETTINGS from "./getPaymentSettings";
import { UPDATE_INVOICE_SETTINGS } from "./queries";

const PaymentSettings = () => {
  const viewer = useViewer();
  let notificaitons = useNotifications();
  const { data, loading, refetch } = useQuery(GET_PAYMENT_SETTINGS);
  const [updateInvoiceSettings] = useMutation(UPDATE_INVOICE_SETTINGS);
  const [paymentMethodModal, setPaymentMethodModal] = React.useState(false);

  const bankTransfersEnabled = data?.viewer?.bankTransfersEnabled;

  if (!viewer.isTeamManager) {
    return <Redirect to="/settings" />;
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
      notificaitons.notify("Your payment preferences have been updated");
    }
  };

  let initialValues = {
    paymentMethod: get(data, "viewer.projectPaymentMethod"),
    name: get(data, "viewer.invoiceSettings.name", get(data, "viewer.name")),
    companyName: get(
      data,
      "viewer.invoiceSettings.companyName",
      get(data, "viewer.companyName"),
    ),
    billingEmail: get(data, "viewer.invoiceSettings.billingEmail") || "",
    vatNumber: get(data, "viewer.invoiceSettings.vatNumber") || "",
    address: {
      line1: get(data, "viewer.invoiceSettings.address.line1") || "",
      line2: get(data, "viewer.invoiceSettings.address.line2") || "",
      city: get(data, "viewer.invoiceSettings.address.city") || "",
      state: get(data, "viewer.invoiceSettings.address.state") || "",
      country: get(
        data,
        "viewer.invoiceSettings.address.country",
        get(data, "viewer.country.id"),
      ),
      postcode: get(data, "viewer.invoiceSettings.address.postcode") || "",
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
            {bankTransfersEnabled ? (
              <>
                <Text
                  mb={1}
                  fontSize="l"
                  fontWeight="medium"
                  color="neutral900"
                  letterSpacing="-0.02rem"
                >
                  Payment Method
                </Text>
                <Text fontSize="s" color="neutral700" mb={6}>
                  How would you like us to collect payments?
                </Text>
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
                    disabled={!data.viewer.bankTransfersEnabled}
                    description="We will collect payment by sending you an invoice"
                  />
                </RadioGroup>
                <Box height={1} bg="neutral100" my="l" />
              </>
            ) : null}

            {formik.values.paymentMethod != "Bank Transfer" ? (
              <CardPaymentSettings
                paymentMethod={data.viewer.paymentMethod}
                openCardModal={() => setPaymentMethodModal(true)}
              />
            ) : null}

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
        isOpen={paymentMethodModal}
        onClose={() => setPaymentMethodModal(false)}
      >
        <Box p="l">
          <UpdatePaymentMethod
            onSuccess={() => {
              setPaymentMethodModal(false);
              refetch();
            }}
          />
        </Box>
      </Modal>
    </Card>
  );
};

export default PaymentSettings;
