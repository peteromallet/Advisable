import React from "react";
import { Text } from "@advisable/donut";
import InvoiceSettingsFields from "../../../components/InvoiceSettingsFields";

const TransferPaymentSettings = ({ formik }) => {
  return (
    <>
      <Text size="s" weight="medium" color="neutral.8" mb="xxs">
        Invoice Settings
      </Text>
      <Text size="xs" color="neutral.5" mb="s">
        The information below will be used to generate your invoice
      </Text>
      <InvoiceSettingsFields formik={formik} />
    </>
  );
};

export default TransferPaymentSettings;
