import React from "react";
import Avatar from "src/components/Avatar";
import composeStyles from "src/utilities/composeStyles";

const classNames = composeStyles({
  base: `
    inline-flex
    flex-shrink-0
  `,
});

const participantClassNames = composeStyles({
  base: `
    border-2
    border-solid
    border-white
    -ml-5
    first:ml-0
  `,
});

export default function ParticipantAvatars({
  size = "xl",
  conversation,
  className,
  ...props
}) {
  const participants = conversation.participants.filter((p) => !p.isViewer);

  return (
    <div className={classNames({ className })} {...props}>
      {participants.map((p) => (
        <Avatar
          key={p.id}
          name={p.name}
          src={p.avatar}
          size={size}
          className={participantClassNames()}
        />
      ))}
    </div>
  );
}
