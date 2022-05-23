import React from "react";
import { Link } from "@advisable/donut";

export default function PaymentRequestCompleted({ message }) {
  const { id, company } = message.paymentRequest;

  return (
    <div
      id={message.id}
      className="p-5 pb-5 pt-5 w-full rounded-lg border-2 border-solid border-neutral100 text-center"
    >
      <div className="text-[17px] leading-5 mb-2 text-neutral900">
        <strong className="font-[550]">{company.name}</strong> fulfilled payment
        request
      </div>
      <Link variant="underlined" to={`/payment_requests/${id}`}>
        See details
      </Link>
    </div>
  );
}
