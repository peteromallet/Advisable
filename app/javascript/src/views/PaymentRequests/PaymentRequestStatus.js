import React from "react";
import { Badge } from "@advisable/donut";

const STATUSES = {
  pending: "neutral",
  paid: "cyan",
  approved: "cyan",
  disputed: "orange",
};

export default function PaymentRequestStatus({ paymentRequest }) {
  return (
    <Badge variant={STATUSES[paymentRequest.status]}>
      {paymentRequest.status}
    </Badge>
  );
}
