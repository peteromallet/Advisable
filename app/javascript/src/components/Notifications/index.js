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

  const remove = React.useCallback(
    (id) => {
      setQueue((items) => items.filter((i) => i.id !== id));
    },
    [setQueue],
  );

  const notify = (content, opts = {}) => {
    const id = uniqueId("notification");
    const timeout = opts.timeout || 3000;
    const onTimeout = () => remove(id);
    setQueue((items) => [...items, { id, content, timeout, onTimeout }]);
  };

  const variants = {
    initial: {
      opacity: 0,
      y: 40,
      scale: 0.4,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Context.Provider value={{ notify }}>
      <Container>
        <AnimatePresence initial={false}>
          {queue.map((item) => {
            return (
              <motion.div key={item.id} layout {...variants}>
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
