import * as React from "react";
import Status from "../Status";
import { Lock } from "@styled-icons/feather";

interface Props {
  children: string;
  isClient?: boolean;
  showIcon?: boolean;
}

const ICONS = {
  "Quote Provided": <Lock />,
  Assigned: <Lock />,
  Working: <Lock />,
  Submitted: <Lock />,
  Approved: <Lock />,
};

export default ({ children }: Props) => {
  return (
    <Status>
      {ICONS[children] && ICONS[children]}
      {children}
    </Status>
  );
};
