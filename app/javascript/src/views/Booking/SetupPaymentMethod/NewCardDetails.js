import React from "react";
import { Text } from "@advisable/donut";
import UpdatePaymentMethod from "../../../components/UpdatePaymentMethod";

const NewCardDetails = ({ onSuccess }) => {
  return (
    <>
      <Text pb="xs" size="xl" lineHeight="s" color="blue.8" weight="medium">
        Payment Details
      </Text>
      <Text size="xs" color="neutral.5" lineHeight="xs" mb="l">
        Please provide your payment details below
      </Text>
      <UpdatePaymentMethod onSuccess={onSuccess} />
    </>
  );
};

export default NewCardDetails;
