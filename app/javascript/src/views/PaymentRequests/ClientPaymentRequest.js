import React from "react";
import { Box } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import ApprovePaymentRequest from "./ApprovePaymentRequest";
import DisputePaymentRequest from "./DisputePaymentRequest";
import PaymentRequestStatus from "./PaymentRequestStatus";
import { usePaymentRequest } from "./queries";

export default function ClientPaymentRequest() {
  const { data, loading, error } = usePaymentRequest();

  if (loading) return <>loading...</>;
  if (error) return <>Something went wrong. Please try again.</>;

  const { status, specialist, lineItems } = data.paymentRequest;

  return (
    <>
      <Box marginBottom={4}>
        <BackButton to="/payment_requests" />
      </Box>
      <h1>{specialist.name}</h1>
      <PaymentRequestStatus paymentRequest={data.paymentRequest} />
      <ul>
        {lineItems.map((lineItem, index) => (
          <li key={index}>{lineItem.description}</li>
        ))}
      </ul>
      {["pending", "disputed"].includes(status) && (
        <ApprovePaymentRequest paymentRequest={data.paymentRequest} />
      )}

      {status === "pending" && (
        <DisputePaymentRequest paymentRequest={data.paymentRequest} />
      )}
    </>
  );
}
