import React from "react";
import ApprovePaymentRequest from "./ApprovePaymentRequest";
import { usePaymentRequest } from "./queries";

export default function ClientPaymentRequest() {
  const { data, loading, error } = usePaymentRequest();

  if (loading) return <>loading...</>;
  if (error) return <>Something went wrong. Please try again.</>;

  const { status, specialist, lineItems } = data.paymentRequest;

  return (
    <>
      <h1>{specialist.name}</h1>
      <ul>
        {lineItems.map((lineItem, index) => (
          <li key={index}>{lineItem.description}</li>
        ))}
      </ul>
      {["pending", "disputed"].includes(status) && (
        <ApprovePaymentRequest paymentRequest={data.paymentRequest} />
      )}
    </>
  );
}
