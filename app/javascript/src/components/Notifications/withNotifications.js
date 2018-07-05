import React from 'react';
import Context from "./context";

// This function takes a component...
export default function withNotifications(Component) {
  // ...and returns another component...
  return function NotificationsWrapper(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <Context.Consumer>
        {notifications => (
          <Component notifications={notifications} {...props} />
        )}
      </Context.Consumer>
    );
  };
}
