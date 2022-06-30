import React from "react";
import possessive from "src/utilities/possesive";

export default function InterviewDeclinedMessage({ message }) {
  const { accounts, requestedBy } = message.interview || {};
  const other = accounts.find((a) => a.id !== requestedBy.id);

  return (
    <div
      id={message.id}
      data-status={message.status}
      className="text-center p-4 rounded-xl border-2 border-solid border-neutral100"
    >
      {other?.firstName} declined {possessive(requestedBy?.firstName)} call
      request
    </div>
  );
}
