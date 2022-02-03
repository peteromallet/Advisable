import React from "react";
import { useApprovePaymentRequest } from "./queries";

export default function ApprovePaymentRequest({ paymentRequest }) {
  const [approve, { loading }] = useApprovePaymentRequest();

  const handleApprove = async () => {
    await approve({
      variables: {
        input: {
          paymentRequest: paymentRequest.id,
        },
      },
    });
  };

  return (
    <button loading={loading} onClick={handleApprove}>
      Approve
    </button>
  );
}
