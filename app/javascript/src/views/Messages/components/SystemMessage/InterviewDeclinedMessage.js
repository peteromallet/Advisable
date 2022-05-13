import React from "react";
import possessive from "src/utilities/possesive";

export default function InterviewDeclinedMessage({ message }) {
  const { user, specialist } = message.interview || {};

  return (
    <div
      id={message.id}
      data-status={message.status}
      className="text-center p-4 rounded-xl border-2 border-solid border-neutral100"
    >
      {specialist?.firstName} declined {possessive(user?.firstName)} call
      request
    </div>
  );
}
