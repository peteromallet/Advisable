import React from "react";
import UserMessage from "./UserMessage";
import SystemMessage from "./SystemMessage";

const COMPONENTS = {
  UserMessage,
  SystemMessage,
};

export default function Message({ message }) {
  const component = COMPONENTS[message.__typename || "UserMessage"];
  return React.createElement(component, { message });
}
