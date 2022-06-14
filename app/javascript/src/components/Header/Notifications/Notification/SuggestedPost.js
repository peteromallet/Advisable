import React from "react";
import truncate from "lodash/truncate";
import { Avatar, Link } from "@advisable/donut";
import { BaseNotification } from ".";

export default function SuggestedPost({ notification, popover }) {
  const { specialist, guildPost } = notification;
  return (
    <BaseNotification
      notification={notification}
      icon={<Avatar size="s" name={specialist.name} url={specialist.avatar} />}
    >
      <p className="text-sm -mt-1">
        You have a new suggested post:
        <Link
          to={`/posts/${guildPost?.id}`}
          fontWeight="medium"
          variant="dark"
          onClick={popover.hide}
        >
          {truncate(guildPost?.title, { length: 100 })}
        </Link>
      </p>
    </BaseNotification>
  );
}
