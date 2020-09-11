import React from "react";
import { uniqueId } from "lodash-es";
import { AnimatePresence, motion } from "framer-motion";
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
    setQueue((items) => [...items, { id, content }]);
    setTimeout(() => remove(id), duration);
  };

  const remove = React.useCallback(
    (id) => {
      setQueue((items) => items.filter((i) => i.id !== id));
    },
    [setQueue],
  );

  const variants = {
    initial: {
      opacity: 0,
      x: "100%",
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 0,
      y: "100%",
    },
  };

  return (
    <Context.Provider value={{ notify }}>
      <Container>
        <AnimatePresence>
          {queue.map((item) => {
            return (
              <motion.div key={item.id} {...variants}>
                <Notification {...item} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Container>
      <React.Fragment>{children}</React.Fragment>
    </Context.Provider>
  );
};

export default Context.Consumer;
