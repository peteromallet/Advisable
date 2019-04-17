import React from "react";
import { Prompt } from "./styles";

export default ({ isClient, task }) => {
  if (task.stage === "Quote Requested" && !isClient) return <Prompt />;
  if (task.stage === "Quote Provided" && isClient) return <Prompt />;
  if (task.stage === "Assigned" && !isClient) return <Prompt />;
  if (task.stage === "Submitted" && isClient) return <Prompt />;

  return null
}