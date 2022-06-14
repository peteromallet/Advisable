import React from "react";
import { DateTime } from "luxon";
import { Link } from "@advisable/donut";
import BaseSystemMessage from "./BaseSystemMessage";

export default function InterviewRescheduledMessage({ message }) {
  const { startsAt, interview } = message;
  const { id } = interview;
  const datetime = DateTime.fromISO(startsAt).toFormat("dd LLLL y 'at' hh:mma");

  return (
    <BaseSystemMessage message={message}>
      <div className="leading-5 mb-2 text-neutral900">
        Your upcoming call was rescheduled to{" "}
        <strong className="font-semibold">{datetime}</strong>
      </div>

      <Link variant="underlined" to={`/interviews/${id}`}>
        Manage call
      </Link>
    </BaseSystemMessage>
  );
}
