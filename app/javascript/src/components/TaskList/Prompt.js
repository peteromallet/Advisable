import React from "react";
import { Prompt } from "./styles";

export default ({ isClient, task }) => {
  if (task.stage === "Not Assigned") return null;
  if (task.stage === "Quote Requested" && isClient) return null;
  if (task.stage === "Quote Provided" && !isClient) return null;
  if (task.stage === "Assigned" && isClient) return null;
  if (task.stage === "Working") return null;

  return <Prompt />
}