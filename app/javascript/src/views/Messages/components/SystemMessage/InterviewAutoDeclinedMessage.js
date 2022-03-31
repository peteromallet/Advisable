import React from "react";

export default function InterviewAutoDeclinedMessage({ message }) {
  const { interview } = message;
  const { specialist } = interview;

  return (
    <div
      id={message.id}
      data-status={message.status}
      className="p-4 w-full rounded-md border-2 border-solid border-neutral100 text-center"
    >
      <p>
        The request was declined because{" "}
        <span className="font-semibold">{specialist.firstName}</span> is not
        available.
      </p>
    </div>
  );
}
