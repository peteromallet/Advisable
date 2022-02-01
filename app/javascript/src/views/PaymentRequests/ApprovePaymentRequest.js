import React from "react";
import { useHistory } from "react-router-dom";
import { useApprovePaymentRequest } from "./queries";

export default function ApprovePaymentRequest({ paymentRequest }) {
  const history = useHistory();
  const [approve, { loading }] = useApprovePaymentRequest();

  const handleApprove = async () => {
    const response = await approve({
      variables: {
        input: {
          paymentRequest: paymentRequest.id,
        },
      },
    });

    const payment = response.data.approvePaymentRequest.paymentRequest.payment;
    if (payment.status !== "succeeded") {
      history.push(`/payments/${payment.id}`);
    }
  };

  return <button onClick={handleApprove}>Approve</button>;
}
