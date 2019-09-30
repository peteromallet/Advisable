import React from "react";
import uniqueId from "lodash/uniqueId";
import { useTransition, animated } from "react-spring";
import { Container } from "./styles";
import Notification from "./Notification";
import Context from "./context";
export { default as useNotifications } from "./useNotifications";
export { default as withNotifications } from "./withNotifications";

export const NotificationsProvider = ({ children }) => {
  const [queue, setQueue] = React.useState([]);

  const notify = (content, opts = {}) => {
    const id = uniqueId("notification");
    const duration = opts["duration"] || 3000;
    setQueue(items => [...items, { id, content }]);
    setTimeout(() => remove(id), duration);
  };

  const remove = id => {
    setQueue(items => items.filter(i => i.id !== id));
  };

  const transitions = useTransition(
    queue,
    item => {
      return item.id;
    },
    {
      from: { transform: "translate3d(100%, 0, 0)", opacity: 0 },
      enter: { transform: "translate3d(0, 0, 0)", opacity: 1 },
      leave: { transform: "translate3d(100%, 0, 0)", opacity: 0 },
    }
  );

  return (
    <Context.Provider value={{ notify }}>
      <Container>
        {transitions.map(({ item, props, key }) => {
          return (
            <animated.div key={key} style={props}>
              <Notification {...item} />
            </animated.div>
          );
        })}
      </Container>
      <React.Fragment>{children}</React.Fragment>
    </Context.Provider>
  );
};

export default Context.Consumer;
