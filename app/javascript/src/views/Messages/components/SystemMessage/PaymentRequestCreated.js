import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { Avatar } from "@advisable/donut";
import Button from "src/components/Button";
import useViewer from "src/hooks/useViewer";
import { useMessagePrompt } from "../MessagePrompt";
import PaymentRequestStatus from "src/views/PaymentRequests/PaymentRequestStatus";

export default function PaymentRequestCreated({ message }) {
  const viewer = useViewer();
  const { specialist, status } = message.paymentRequest;
  const { show, dismiss, highlight } = useMessagePrompt(
    message,
    "New payment request",
  );
  const datetime = DateTime.fromISO(message.createdAt).toFormat(
    "dd MMM, yyyy HH:mm",
  );

  useEffect(() => {
    if (status === "pending" && viewer.isClient) {
      show();
    } else {
      dismiss();
    }
  }, [dismiss, status, show, viewer.isClient]);

  return (
    <div
      id={message.id}
      className="rounded-lg border-2 border-solid border-white bg-white shadow-md p-6"
      animate={{
        borderColor: highlight ? ["#1C1C25", "#FFF"] : "#FFF",
      }}
    >
      <div className="flex gap-3">
        <Avatar
          bg="blue100"
          color="blue300"
          size="xs"
          display="inline-flex"
          name={specialist.name}
          url={specialist.avatar}
        />
        <div>
          <div className="text-base leading-5 mb-2 text-neutral900">
            <strong className="font-semibold">
              {specialist.name || "Deleted user"}
            </strong>{" "}
            requested payment
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-sm leading-4 text-neutral600">{datetime}</div>
            <PaymentRequestStatus status={message.paymentRequest.status} />
          </div>
        </div>
        <div className="ml-auto my-auto">
          <Link to={`/payment_requests/${message.paymentRequest.id}`}>
            <Button variant={status === "pending" ? "primary" : "subtle"}>
              View request
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
