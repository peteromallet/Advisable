import { useEffect } from "react";
import { useDialogState } from "reakit/Dialog";
import { useLocation, useHistory } from "react-router-dom";

const useRoutedModal = (path, config) => {
  const modal = useDialogState();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === config.returnLocation) {
      modal.hide();
    }

    if (location.pathname === path && !modal.visible) {
      modal.show();
    }
  }, [location.pathname, modal.visible]);

  const routedModal = {
    ...modal,
    show: () => {
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
