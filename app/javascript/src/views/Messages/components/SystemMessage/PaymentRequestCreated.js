import React from "react";
import { DateTime } from "luxon";
import { Avatar } from "@advisable/donut";
import Button from "src/components/Button";

export default function PaymentRequestCreated({ message }) {
  const { specialist } = message.paymentRequest;
  const datetime = DateTime.fromISO(message.createdAt).toFormat(
    "dd LLLL y 'at' hh:mma",
  );

  return (
    <div className="rounded-lg bg-white shadow-lg">
      <div className="pr-3 flex">
        <Avatar
          bg="blue100"
          color="blue300"
          size="xs"
          display="inline-flex"
          name={specialist.name}
          url={specialist.avatar}
        />
      </div>
      <div className="w-full">
        <div className="text-[17px] font-[550] mb-1">
          {specialist.name || "Deleted user"} requested payment
        </div>
        <div className="text-xs font-[400] text-neutral600">{datetime}</div>
        <div>{message.paymentRequest.status}</div>
        <Button>View request</Button>
      </div>
    </div>
  );
}
