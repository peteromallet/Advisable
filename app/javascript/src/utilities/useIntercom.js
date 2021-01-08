import { useEffect } from "react";
import usePrevious from "./usePrevious";

const bootIntercom = (viewer) => {
  if (!window?.Intercom) return null;

  let data = {
    hide_default_launcher: window._hide_intercom || false,
    app_id: process.env.INTERCOM_APP_ID,
  };

  if (viewer) {
    data.user_id = viewer.id;
    data.email = viewer.email;
    data.name = viewer.name;
    data.created_at = viewer.createdAt;
  }

  window.Intercom("boot", data);
};

const useIntercom = (location, viewer) => {
  const previousViewer = usePrevious(viewer);

  useEffect(() => {
    bootIntercom(viewer);

    return () => window.Intercom("shutdown");
  }, [viewer]);

  useEffect(() => {
    if (window.Intercom) {
      // If the user has just logged out. i.e there was a viewer and now there
      // isn't then do a reboot to clear conversations.
      if (previousViewer && !viewer) {
        window.Intercom("shutdown");
        bootIntercom(viewer);
        return;
      }

      // If the user has changed then reboot
      if (viewer && previousViewer?.id !== viewer?.id) {
        window.Intercom("shutdown");
        bootIntercom(viewer);
      }
    }
  }, [previousViewer, viewer]);

  useEffect(() => {
    if (!window.Intercom) return;

    window.Intercom("update", {
      last_request_at: parseInt(new Date().getTime() / 1000),
    });
  }, [location.pathname]);
};

export default useIntercom;
