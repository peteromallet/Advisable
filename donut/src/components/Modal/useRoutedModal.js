import { useRef, useEffect } from "react";
import { useDialogState } from "reakit/Dialog";
import { useLocation, useHistory } from "react-router-dom";

const useRoutedModal = (path, config) => {
  const modal = useDialogState();
  const history = useHistory();
  const location = useLocation();
  const initialLocation = useRef(null);

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
      if (config?.returnLocation) {
        history.replace(config.returnLocation);
      }
      modal.hide();
    },
  };

  return routedModal;
};

export default useRoutedModal;
