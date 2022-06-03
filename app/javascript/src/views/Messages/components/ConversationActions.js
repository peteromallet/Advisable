import { Logout, Speakerphone } from "@styled-icons/heroicons-outline";
import React from "react";
import ConversationAction from "./ConversationAction";
import ConversationActionsList from "./ConversationActionsList";

export default function ConversationActions({ conversation }) {
  return (
    <div className="p-8 border-t border-solid border-neutral100">
      <ConversationActionsList>
        <ConversationAction icon={Logout}>
          Leave conversation
        </ConversationAction>
        <ConversationAction icon={Speakerphone}>Report</ConversationAction>
      </ConversationActionsList>
    </div>
  );
}
