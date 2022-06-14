import React, { createElement } from "react";
import { relativeDate } from "@guild/utils";
import SuggestedPost from "./SuggestedPost";

const TYPES = {
  SuggestedPost,
};

export function BaseNotification({ notification, icon, children }) {
  return (
    <div className="flex">
      {icon && (
        <div className="w-10 h-10 shrink-0 rounded-full bg-neutral-100 mr-4 grid place-items-center">
          {icon}
        </div>
      )}
      <div>
        <div className="mb-2">{children}</div>
        <p className="text-xs leading-none text-neutral600">
          {relativeDate(notification.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default function Notification({ popover, notification }) {
  const component = TYPES[notification.__typename];

  return <div>{createElement(component, { notification, popover })}</div>;
}
