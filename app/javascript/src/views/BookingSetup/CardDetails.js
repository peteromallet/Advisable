import React from "react";
import { Text, Card } from "@advisable/donut";
import UpdatePaymentMethod from "../../components/UpdatePaymentMethod";

const CardDetails = ({ nextStep, data }) => {
  const { application } = data;

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
      <Text color="neutral700" lineHeight="1.4" mb={8}>
        It looks like you haven&apos;t added a payment method yet. Before you
        start working with {application.specialist.firstName}, we need to know
        how to collect payment for them. Please add a payment method below.
      </Text>
      <UpdatePaymentMethod onSuccess={nextStep} buttonLabel="Continue" />
    </Card>
  );
};

export default CardDetails;
