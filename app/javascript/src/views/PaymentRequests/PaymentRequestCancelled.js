import React from "react";
import { Text } from "@advisable/donut";

export default function PaymentRequestCancelled({ paymentRequest }) {
  const { name } = paymentRequest.specialist;

  return (
    <>
      <Text
        fontSize="xl"
        fontWeight={560}
        marginBottom={2}
        letterSpacing="-0.02em"
      >
        Payment request canceled
      </Text>
      <Text fontSize="lg" lineHeight="24px">
        {name} has cancled this payment request and it can no longer be paid.
      </Text>
    </>
  );
}
