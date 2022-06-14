import React, { createElement } from "react";
import { relativeDate } from "@guild/utils";
import SuggestedPost from "./SuggestedPost";
import SendAgreement from "./SendAgreement";
import composeStyles from "src/utilities/composeStyles";

const TYPES = {
  SuggestedPost,
  SendAgreement,
};

const baseNotificationClasses = composeStyles({
  base: `flex gap-4 p-4`,
  variants: {
    clickable: `cursor-pointer hover:bg-neutral-100`,
  },
});

export function BaseNotification({ notification, icon, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className={baseNotificationClasses({ clickable: Boolean(onClick) })}
    >
      {icon && (
        <div className="w-10 h-10 shrink-0 rounded-full bg-neutral-100 grid place-items-center">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <div className="mb-1.5">{children}</div>
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
