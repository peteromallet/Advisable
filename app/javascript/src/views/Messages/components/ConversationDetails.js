import React from "react";
import ParticipantNames from "./ParticipantNames";
import ParticipantAvatars from "./ParticipantAvatars";

export default function ConversationDetails({ conversation }) {
  return (
    <>
      <div className="text-center">
        <ParticipantAvatars conversation={conversation} className="mb-4" />
        <ParticipantNames
          conversation={conversation}
          className="text-center text-lg font-medium"
        />
      </div>
    </>
  );
}
