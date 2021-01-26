import React from "react";
import { Text, Card } from "@advisable/donut";
import UpdatePaymentMethod from "../../components/UpdatePaymentMethod";
import { useHistory } from "react-router";

const CardDetails = ({ data }) => {
  const history = useHistory();
  const { application } = data;

  const handleNextStep = () => {
    history.push(`/book/${data.application.id}/invoice_settings`);
  };

  return (
    <Card padding="xl" borderRadius="12px">
      <Text
        mb={1}
        fontSize="4xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.04em"
      >
        Setup payments
      </Text>
      <Text color="neutral700" lineHeight="1.4" mb={6}>
        It looks like you haven&apos;t added a payment method yet. Before you
        start working with {application.specialist.firstName}, we need to know
        how to collect payment for them. Please add a payment method below.
      </Text>
      <UpdatePaymentMethod onSuccess={handleNextStep} buttonLabel="Continue" />
      <Text mt={8} fontSize="s" color="neutral500" lineHeight="1.2">
        You wont be charged at this time. We will charge this card when
        collecting payment for {application.specialist.firstName}.
      </Text>
    </Card>
  );
};

export default CardDetails;
