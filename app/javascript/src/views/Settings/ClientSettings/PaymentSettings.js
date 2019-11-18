import React from "react";
import { get } from "lodash";
import { useQuery, useMutation } from "react-apollo";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Card,
  Link,
  Text,
  Button,
  Skeleton,
  Radio,
  RadioGroup,
} from "@advisable/donut";
import Modal from "../../../components/Modal";
import { useNotifications } from "../../../components/Notifications";
import UpdatePaymentMethod from "../../../components/UpdatePaymentMethod";
import InvoiceSettingsFields from "../../../components/InvoiceSettingsFields";
import CardPaymentSettings from "./CardPaymentSettings";
import UPDATE_PAYMENT_INFO from "./updateProjectPaymentMethod";
import GET_PAYMENT_SETTINGS from "./getPaymentSettings";

const PaymentSettings = () => {
  let notificaitons = useNotifications();
  const { data, loading, refetch } = useQuery(GET_PAYMENT_SETTINGS);
  const [updateProjectPaymentMethod] = useMutation(UPDATE_PAYMENT_INFO);
  const [paymentMethodModal, setPaymentMethodModal] = React.useState(false);

  const handleSubmit = async (values, formik) => {
    await updateProjectPaymentMethod({
      variables: {
        input: values,
      },
    });

    formik.setSubmitting(false);

    notificaitons.notify("Your payment preferences have been updated");
  };

  let initialValues = {
    paymentMethod: get(data, "viewer.projectPaymentMethod"),
    invoiceSettings: {
      name: get(data, "viewer.invoiceSettings.name", get(data, "viewer.name")),
      companyName: get(
        data,
        "viewer.invoiceSettings.companyName",
        get(data, "viewer.companyName")
      ),
      billingEmail: get(data, "viewer.invoiceSettings.billingEmail"),
      vatNumber: get(data, "viewer.invoiceSettings.vatNumber"),
      address: {
        line1: get(data, "viewer.invoiceSettings.address.line1"),
        line2: get(data, "viewer.invoiceSettings.address.line2"),
        city: get(data, "viewer.invoiceSettings.address.city"),
        state: get(data, "viewer.invoiceSettings.address.state"),
        country: get(
          data,
          "viewer.invoiceSettings.address.country",
          get(data, "viewer.country.id")
        ),
        postcode: get(data, "viewer.invoiceSettings.address.postcode", ""),
      },
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
    <Card p="l">
      <Text
        mb="l"
        as="h1"
        fontSize="xxl"
        color="blue.9"
        fontWeight="semibold"
        letterSpacing="-0.015em"
      >
        Payment Preferences
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isInitialValid={true}
      >
        {formik => (
          <Form>
            <Text
              mb="xxs"
              fontSize="l"
              color="neutral.7"
              fontWeight="semibold"
              letterSpacing="-0.01rem"
            >
              Payment Method
            </Text>
            <Text fontSize="s" color="neutral.7" mb="s">
              This is what we will use to collect payment for the freelancers
              you work with.
            </Text>
            <RadioGroup>
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
            {!data.viewer.bankTransfersEnabled && (
              <Text fontSize="xs" color="neutral.7" mt="m">
                Please contact{" "}
                <Link href="mailto:payments@advisable.com">
                  payments@advisable.com
                </Link>{" "}
                to enable bank transfers for larger payments.
              </Text>
            )}
            <Box height={1} bg="neutral.1" my="l" />

            {formik.values.paymentMethod === "Card" && (
              <CardPaymentSettings
                paymentMethod={data.viewer.paymentMethod}
                openCardModal={() => setPaymentMethodModal(true)}
              />
            )}

            <Text
              fontSize="l"
              fontWeight="semibold"
              color="neutral.7"
              mb="xxs"
              letterSpacing="-0.01rem"
            >
              Invoice Settings
            </Text>
            <Text fontSize="s" color="neutral.7" mb="s">
              The information below will be used to generate your invoice
            </Text>

            <InvoiceSettingsFields formik={formik} />

            <Button
              appearance="primary"
              intent="success"
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
            >
              Save Changes
            </Button>
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
