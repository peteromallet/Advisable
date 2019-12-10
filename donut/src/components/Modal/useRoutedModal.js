import { useRef, useEffect, useState } from "react";
import { useDialogState } from "reakit/Dialog";
import { useLocation, useHistory } from "react-router-dom";

const useRoutedModal = path => {
  const modal = useDialogState();
  const history = useHistory();
  const location = useLocation();
  const [navCount, setNavCount] = useState(1);
  const initialLocation = useRef(null);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    return history.listen(e => {
      if (history.action === "PUSH") {
        setRoutes([...routes, location]);
      }

      if (history.action === "REPLACE") {
        setRoutes([...routes.slice(0, routes.length - 1), location]);
      }
      // switch (history.action) {
      //   case "POP": {
      //     console.log("POP");
      //     setNavCount(n => n - 1);
      //     break;
      //   }
      //   case "PUSH": {
      //     console.log("PUSH");
      //     setRoutes(r => [...r, location]);
      //     setNavCount(n => n + 1);
      //     break;
      //   }
      //   case "REPLACE": {
      //     console.log("REPLACE");
      //   }
      // }
    });
  }, [routes, setRoutes]);

  useEffect(() => {
    if (location.pathname === initialLocation.current?.pathname) {
      modal.hide();
    }

    if (location.pathname === path && !modal.visible) {
      modal.show();
    }
  }, [location.pathname, modal.visible]);

  const routedModal = {
    ...modal,
    show: () => {
      initialLocation.current = location;
      history.push(path);
      modal.show();
    },
    hide: () => {
      history.replace(initialLocation.current);
      modal.hide();
    },
  };

  return routedModal;
};

export default useRoutedModal;
