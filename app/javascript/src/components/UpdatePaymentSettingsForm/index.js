import React from "react";
import { get } from "lodash";
import { compose, graphql } from "react-apollo";
import { Formik, Form, Field } from "formik";
import { Button, Box, Text } from "@advisable/donut";
import Select from "../Select";
import TextField from "../TextField";
import AddressFields from "../AddressFields";
import { GET_PAYMENT_SETTINGS, UPDATE_PAYMENT_SETTINGS } from "./queries";

const UpdatePaymentSettingsForm = ({
  data,
  updatePaymentSettings,
  onSuccess,
}) => {
  const handleSubmit = async values => {
    await updatePaymentSettings({
      variables: { input: values },
    });

    if (onSuccess) onSuccess();
  };

  let initialValues = {
    bankHolderName: get(
      data,
      "viewer.bankHolderName",
      get(data, "viewer.name")
    ),
    bankCurrency: get(
      data,
      "viewer.bankCurrency",
      get(data, "viewer.country.currency.isoCode")
    ),
    vatNumber: get(data, "viewer.vatNumber"),
    bankHolderAddress: {
      line1: get(data, "viewer.bankHolderAddress.line1"),
      line2: get(data, "viewer.bankHolderAddress.line2"),
      city: get(data, "viewer.bankHolderAddress.city"),
      state: get(data, "viewer.bankHolderAddress.state"),
      country: get(
        data,
        "viewer.bankHolderAddress.country",
        get(data, "viewer.country.id")
      ),
      postcode: get(data, "viewer.bankHolderAddress.postcode"),
    },
  };

  let currencies = get(data, "currencies", []).map(currency => ({
    label: `${currency.name} (${currency.isoCode})`,
    value: currency.isoCode,
  }));

  if (data.loading) {
    return <>loading...</>;
  }

  return (
    <>
      <Text size="xl" weight="medium" color="neutral.8" mb="xxs">
        Payment Settings
      </Text>
      <Text size="s" mb="s" color="neutral.5">
        Advisable aims to process your payment the Friday following client
        approval of a task.
      </Text>
      <Text size="xs" color="neutral.5" lineHeight="xs" mb="l">
        All payments are made directly to your bank account via TransferWise:
        once your payment has been processed, TransferWise will send you an
        email where you can securely enter your bank account details
      </Text>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {formik => (
          <Form>
            <Box mb="m">
              <Field
                name="bankHolderName"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bank account holder name"
                    placeholder="Full name or company name..."
                    description="Please provivde the name of the bank account holder. Either your full name or company name."
                  />
                )}
              />
            </Box>
            <Box mb="m">
              <AddressFields
                label="Bank holder address"
                name="bankHolderAddress"
              />
            </Box>
            <Box mb="m">
              <Field
                name="bankCurrency"
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Bank currency"
                    options={currencies}
                  />
                )}
              />
            </Box>
            <Box mb="m">
              <Field
                name="vatNumber"
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="VAT Number"
                    placeholder="VAT Number..."
                    description="Provide your VAT number if you have one."
                  />
                )}
              />
            </Box>
            <Button
              intent="success"
              appearance="primary"
              loading={formik.isSubmitting}
            >
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default compose(
  graphql(GET_PAYMENT_SETTINGS),
  graphql(UPDATE_PAYMENT_SETTINGS, { name: "updatePaymentSettings" })
)(UpdatePaymentSettingsForm);
