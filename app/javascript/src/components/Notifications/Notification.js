import React from "react";
import { NotificationCard } from "./styles";

function useTimeout(callback, delay) {
  const timeout = React.useRef();
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    timeout.current = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(timeout.current);
  }, [delay]);

  return timeout;
}

export default function Notification({ content, timeout = 3000, onTimeout }) {
  useTimeout(onTimeout, timeout);
  return <NotificationCard>{content}</NotificationCard>;
}
