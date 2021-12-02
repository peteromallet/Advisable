import React from "react";
import { BaseMessage } from "./Message";

export default function UserMessage({ message }) {
  return <BaseMessage message={message} sending={message.status !== "SENT"} />;
}
