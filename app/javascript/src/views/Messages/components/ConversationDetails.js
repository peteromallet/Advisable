import React from "react";
import ParticipantNames from "./ParticipantNames";
import ParticipantAvatars from "./ParticipantAvatars";

export default function ConversationDetails({ conversation }) {
  return (
    <>
      <div className="text-center">
        <ParticipantAvatars
          className="mb-4"
          conversation={conversation}
          size={conversation.participants.length > 2 ? "xl" : "2xl"}
        />
        <ParticipantNames
          conversation={conversation}
          className="text-center text-lg font-medium"
        />
      </div>
    </>
  );
}
