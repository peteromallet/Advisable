import React from "react";
import { usePaymentRequest } from "./queries";

export default function FreelancerPaymentRequest() {
  const { data, loading, error } = usePaymentRequest();

  if (loading) return <>loading...</>;
  if (error) return <>Something went wrong. Please try again.</>;

  const { company, lineItems } = data.paymentRequest;

  return (
    <>
      <h1>{company.name}</h1>
      <ul>
        {lineItems.map((lineItem) => (
          <li key={lineItem.id}>{lineItem.description}</li>
        ))}
      </ul>
    </>
  );
}
