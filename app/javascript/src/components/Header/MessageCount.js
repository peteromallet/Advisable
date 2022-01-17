import React from "react";
import { Badge } from "./styles";
import useMessageCount from "src/hooks/useMessageCount";
import { useReceivedMessage } from "src/views/Messages/queries";

export default function MessageCount() {
  useReceivedMessage();
  const count = useMessageCount();
  if (count === 0) return null;
  return <Badge>{count}</Badge>;
}
