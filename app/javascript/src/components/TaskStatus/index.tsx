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
  "Working": "lock",
  "Submitted": "lock",
  "Approved": "lock",
}

export default ({ children }: Props) => {
  return (
    <Status>
      {ICONS[children] && <Icon height={12} strokeWidth={2} icon={ICONS[children]} />}
      {children}
    </Status>
  )
}