import React from "react";
import { Badge } from "./styles";
import useMessageCount from "src/hooks/useMessageCount";

export default function MessageCount() {
  const count = useMessageCount();
  if (count === 0) return null;
  return <Badge>{count}</Badge>;
}
