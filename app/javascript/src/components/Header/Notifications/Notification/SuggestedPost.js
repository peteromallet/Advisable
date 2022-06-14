import React from "react";
import truncate from "lodash/truncate";
import { Avatar } from "@advisable/donut";
import { BaseNotification } from ".";
import { useNavigate } from "react-router-dom";

export default function SuggestedPost({ notification, popover }) {
  const navigate = useNavigate();
  const { specialist, guildPost } = notification;

  const handleClick = () => {
    popover.hide();
    navigate(`/posts/${guildPost.id}`);
  };

  return (
    <BaseNotification
      notification={notification}
      icon={<Avatar size="s" name={specialist.name} url={specialist.avatar} />}
      onClick={handleClick}
    >
      <div className="leading-tight -mt-1">
        You have a new suggested post:
        <br />
        <strong className="font-medium truncate block text-blue-800">
          {truncate(guildPost?.title, { length: 100 })}
        </strong>
      </div>
    </BaseNotification>
  );
}
