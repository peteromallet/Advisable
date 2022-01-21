import { useEffect } from "react";
import { useDialogState } from "reakit/Dialog";
import { useLocation, useNavigate } from "react-router-dom";

const useRoutedModal = (path, config) => {
  const modal = useDialogState();
  const navigate = useNavigate();
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
      navigate(path);
      modal.show();
    },
    hide: () => {
      if (config?.returnLocation) {
        navigate(config.returnLocation, { replace: true });
      }
      modal.hide();
    },
  };

  return routedModal;
};

export default useRoutedModal;
