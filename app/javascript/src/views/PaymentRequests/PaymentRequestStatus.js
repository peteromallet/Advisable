import React from "react";
import { Badge } from "@advisable/donut";

const STATUSES = {
  pending: "orange",
  paid: "cyan",
  approved: "cyan",
  disputed: "orange",
  canceled: "neutral",
};

export default function PaymentRequestStatus({ status }) {
  return <Badge variant={STATUSES[status] || "neutral"}>{status}</Badge>;
}
