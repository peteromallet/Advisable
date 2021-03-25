import React from "react";
import Status from "../Status";
import { Lock } from "@styled-icons/feather/Lock";

const ICONS = {
  "Quote Provided": <Lock />,
  Assigned: <Lock />,
  Working: <Lock />,
  Submitted: <Lock />,
  Approved: <Lock />,
};

export default function TaskStatus({ children }) {
  return (
    <Status>
      {ICONS[children] && ICONS[children]}
      {children}
    </Status>
  );
}
