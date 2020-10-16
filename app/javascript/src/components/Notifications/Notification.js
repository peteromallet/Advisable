import { useRef, useEffect } from "react";
import { NotificationCard } from "./styles";

function useTimeout(callback, delay) {
  const timeout = useRef();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    timeout.current = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(timeout.current);
  }, [delay]);

  return timeout;
}

export default function Notification({ content, timeout = 3000, onTimeout }) {
  useTimeout(onTimeout, timeout);
  return <NotificationCard>{content}</NotificationCard>;
}
