import React from "react";
import { Badge } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import { ExclamationCircle } from "@styled-icons/heroicons-solid";
import { shouldShowPastDue } from "./utilities";

export default function PaymentRequestPastDue({ paymentRequest }) {
  const viewer = useViewer();
  if (!shouldShowPastDue(paymentRequest)) return null;

  const { company, specialist } = paymentRequest;

  return (
    <div className="mt-4 bg-red-50 p-4 rounded-md">
      <Badge variant="red" className="mb-2" prefix={<ExclamationCircle />}>
        Past Due
      </Badge>
      <p className="text-sm">
        {viewer.isSpecialist ? (
          <>
            This payment request is past due. We have reached out to{" "}
            {company.name} to collect payment. Once we have received the
            payment, the funds will be released to you on our next weekly
            payout, which is done on Tuesdays.
          </>
        ) : (
          <>
            This request is awaiting payment from {company.name}. Once paid the
            funds will be released immediately to {specialist.name}.
          </>
        )}
      </p>
    </div>
  );
}
