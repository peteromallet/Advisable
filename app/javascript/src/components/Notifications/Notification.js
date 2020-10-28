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

function Notification({ content, variant, timeout = 3000, onTimeout }) {
  useTimeout(onTimeout, timeout);
  return <NotificationCard $variant={variant}>{content}</NotificationCard>;
}

Notification.defaultProps = {
  variant: "default",
};

export default Notification;
