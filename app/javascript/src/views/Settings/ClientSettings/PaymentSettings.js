import React from "react";
import { get, flowRight as compose } from "lodash";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Formik, Form } from "formik";
import { Box, Card, Text, Button, Skeleton } from "@advisable/donut";
import Modal from "../../../components/Modal";
import Choices from "../../../components/Choices";
import { useNotifications } from "../../../components/Notifications";
import UpdatePaymentMethod from "../../../components/UpdatePaymentMethod";
import CardPaymentSettings from "./CardPaymentSettings";
import TransferPaymentSettings from "./TransferPaymentSettings";
import UPDATE_PROJECT_PAYMENT_METHOD from "./updateProjectPaymentMethod";

const GET_PAYMENT_SETTINGS = gql`
  query getPaymentSettings {
    viewer {
      ... on User {
        id
        projectPaymentMethod
        name
        companyName
        country {
          id
        }
        invoiceSettings {
          name
          companyName
          vatNumber
          address {
            line1
            line2
            city
            state
            country
            postcode
          }
        }
        paymentMethod {
          brand
          last4
          expMonth
          expYear
        }
      }
    }
  }
`;

const PaymentSettings = ({ data, updateProjectPaymentMethod }) => {
  let notificaitons = useNotifications();
  const [paymentMethodModal, setPaymentMethodModal] = React.useState(false);

  const handleSubmit = async values => {
    await updateProjectPaymentMethod({
      variables: {
        input: values,
      },
    });

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

  if (data.loading) {
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
      <Text as="h1" size="xl" weight="medium" color="blue.8" mb="l">
        Payment Preferences
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isInitialValid={true}
      >
        {formik => (
          <Form>
            <Text size="s" weight="medium" color="neutral.8" mb="xxs">
              What is your preferred project payment method?
            </Text>
            <Text size="xs" color="neutral.5" mb="s">
              This is what we will use to collect payment for the freelancers
              you work with.
            </Text>
            <Box mb="l">
              <Choices
                name="paymentMethod"
                onChange={formik.handleChange}
                value={formik.values.paymentMethod}
                choices={[
                  {
                    name: "Payments via card",
                    value: "Card",
                    description:
                      "We will collect payment by charging your card",
                  },
                  {
                    name: "Payments via bank transfer",
                    value: "Bank Transfer",
                    description:
                      "We will collect payment by sending you an invoice",
                  },
                ]}
              />
            </Box>
            {formik.values.paymentMethod === "Card" && (
              <CardPaymentSettings
                paymentMethod={data.viewer.paymentMethod}
                openCardModal={() => setPaymentMethodModal(true)}
              />
            )}
            {formik.values.paymentMethod === "Bank Transfer" && (
              <TransferPaymentSettings formik={formik} />
            )}
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
              data.refetch();
            }}
          />
        </Box>
      </Modal>
    </Card>
  );
};

export default compose(
  graphql(GET_PAYMENT_SETTINGS),
  graphql(UPDATE_PROJECT_PAYMENT_METHOD, { name: "updateProjectPaymentMethod" })
)(PaymentSettings);
