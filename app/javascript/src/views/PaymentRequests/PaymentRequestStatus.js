import React from "react";
import { Badge } from "@advisable/donut";
import { ExclamationCircle } from "@styled-icons/heroicons-solid";

const STATUSES = {
  pending: "orange",
  paid: "cyan",
  approved: "cyan",
  disputed: "orange",
  canceled: "neutral",
  paid_out: "cyan",
  past_due: "red",
};

const LABELS = {
  past_due: "Past Due",
  paid_out: "Paid out",
};

const PREFIX = {
  past_due: <ExclamationCircle />,
};

export default function PaymentRequestStatus({ status, pastDue }) {
  const key = pastDue ? "past_due" : status;

  return (
    <Badge prefix={PREFIX[key]} variant={STATUSES[key] || "neutral"}>
      {LABELS[key] || key}
    </Badge>
  );
}
