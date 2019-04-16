import * as React from "react";
import Icon from "../Icon";
import Status from "../Status";

interface Props {
  children: string;
  isClient?: boolean;
  showIcon?: boolean;
}

const ICONS = {
  "Quote Provided": "lock",
  "Assigned": "lock",
  "In Progress": "lock",
  "Pending Approval": "lock",
}

const COLORS = {
  // "Not Assigned": "yellow",
  "Quote Provided": "yellow",
  "Pending Approval": "yellow",
}

export default ({ children, showIcon }: Props) => {
  return (
    <Status styling={COLORS[children]}>
      {showIcon && ICONS[children] && <Icon height={12} strokeWidth={2} icon={ICONS[children]} />}
      {children}
    </Status>
  )
}