import * as React from "react";
import context from './context';

// Proides a react hook for creating notifications
const useNotifications = (message) => {
  const currentContext = React.useContext(context);
  return currentContext
}

export default useNotifications