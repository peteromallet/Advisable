import React from "react";
import { Badge } from "@advisable/donut";

const STATUSES = {
  pending: "orange",
  paid: "cyan",
  approved: "cyan",
  disputed: "orange",
  canceled: "neutral",
  paid_out: "cyan",
};

const LABELS = {
  paid_out: "Paid out",
};

export default function PaymentRequestStatus({ status }) {
  return (
    <Badge variant={STATUSES[status] || "neutral"}>
      {LABELS[status] || status}
    </Badge>
  );
}
