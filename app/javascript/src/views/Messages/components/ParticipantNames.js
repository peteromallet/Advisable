import React from "react";
import commaSeparated from "src/utilities/commaSeparated";

export default function ParticipantNames({ conversation, ...props }) {
  const participants = conversation.participants.filter((p) => !p.isViewer);

  const names = participants.map((participant) => {
    if (participants.length > 1) {
      return participant.firstName;
    }

    return participant.name;
  });

  return <div {...props}>{commaSeparated(names)}</div>;
}
