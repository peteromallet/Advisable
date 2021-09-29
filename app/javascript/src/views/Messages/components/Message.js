import React from "react";
import UserMessage from "./UserMessage";
import SystemMessage from "./SystemMessage";
import GuildPostMessage from "./GuildPostMessage";

const COMPONENTS = {
  UserMessage,
  SystemMessage,
  GuildPostMessage,
};

export default function Message({ message }) {
  const component = COMPONENTS[message.__typename] || UserMessage;
  return React.createElement(component, { message });
}
