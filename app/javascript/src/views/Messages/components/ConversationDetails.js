import React from "react";
import ParticipantNames from "./ParticipantNames";
import ParticipantAvatars from "./ParticipantAvatars";
import ConversationAgreement from "./ConversationAgreement";
import ConversationCalls from "./ConversationCalls";
import ConversationActions from "./ConversationActions";
import ProfileLink from "./ProfileLink";

export default function ConversationDetails({ conversation }) {
  return (
    <>
      <div className="text-center p-8 border-b border-solid border-neutral100">
        <ParticipantAvatars
          className="mb-4"
          conversation={conversation}
          size={conversation.participants.length > 2 ? "xl" : "2xl"}
        />
        <ParticipantNames
          conversation={conversation}
          className="text-center text-lg font-medium"
        />
        <ProfileLink conversation={conversation} />
      </div>
      <ConversationAgreement conversation={conversation} />
      <ConversationCalls conversation={conversation} />
      {/* <ConversationActions conversation={conversation} /> */}
    </>
  );
}
