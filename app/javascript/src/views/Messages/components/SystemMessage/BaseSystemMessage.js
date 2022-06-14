import React from "react";

export default function BaseSystemMessage({ message, children }) {
  return (
    <div
      id={message.id}
      className="p-5 w-full rounded-lg border-2 border-solid border-neutral100 text-center"
    >
      {children}
    </div>
  );
}
