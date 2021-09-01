import React from "react";
import { Badge } from "./styles";
import {
  useNativeMessageCount,
  useTalkJSMessageCount,
} from "src/hooks/useMessageCount";

function TalkJSMessageCount() {
  const count = useTalkJSMessageCount();
  if (count === 0) return null;
  return <Badge>{count}</Badge>;
}

function NativeMessageCount() {
  const count = useNativeMessageCount();
  if (count === 0) return null;
  return <Badge>{count}</Badge>;
}

export default function MessageCount() {
  const showNative = sessionStorage.getItem("/messages") === "2";
  return showNative ? <NativeMessageCount /> : <TalkJSMessageCount />;
}
