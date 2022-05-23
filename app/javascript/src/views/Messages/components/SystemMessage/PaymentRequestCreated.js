import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { Avatar } from "@advisable/donut";
import Button from "src/components/Button";
import { useMessagePrompt } from "../MessagePrompt";
import PaymentRequestStatus from "src/views/PaymentRequests/PaymentRequestStatus";

export default function PaymentRequestCreated({ message }) {
  const { specialist } = message.paymentRequest;
  const { show, dismiss, highlight } = useMessagePrompt(
    message,
    "New payment request",
  );
  const datetime = DateTime.fromISO(message.createdAt).toFormat(
    "dd MMM, yyyy HH:mm",
  );

  useEffect(() => {
    if (message.paymentRequest.status === "pending") {
      show();
    } else {
      dismiss();
    }
  }, [dismiss, message, show]);

  return (
    <motion.div
      id={message.id}
      style={{ borderColor: "#fff" }}
      className="rounded-lg border-2 border-solid bg-white shadow-md p-6"
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
          <div className="text-[17px] leading-5 mb-2 text-neutral900">
            <strong className="font-[550]">
              {specialist.name || "Deleted user"}
            </strong>{" "}
            requested payment
          </div>
          <div className="flex gap-2">
            <div className="text-sm font-[400] leading-4 pt-[3px] pb-[1px] text-neutral600">
              {datetime}
            </div>
            <PaymentRequestStatus status={message.paymentRequest.status} />
          </div>
        </div>
        <div className="ml-auto my-auto">
          <Link to={`/payment_requests/${message.paymentRequest.id}`}>
            <Button>View request</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
