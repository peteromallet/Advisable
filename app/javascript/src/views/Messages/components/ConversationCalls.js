import { VideoCamera } from "@styled-icons/heroicons-outline";
import React from "react";
import ConversationAction from "./ConversationAction";
import ConversationActionsList from "./ConversationActionsList";

export default function ConversationCalls({ conversation }) {
  const other = conversation.participants.find((p) => !p.isViewer);

  return (
    <div className="p-8 border-t border-solid border-neutral100">
      <h4 className="leading-none font-medium mb-2">Upcoming calls</h4>
      <p className="leading-tight text-[15px] text-neutral-700 mb-5">
        You don't have any upcoming calls with {other.firstName}.
      </p>
      <ConversationActionsList>
        <ConversationAction icon={VideoCamera} variant="blue">
          Request a call
        </ConversationAction>
      </ConversationActionsList>
    </div>
  );
}
