import { get } from "lodash";
import { useState, useEffect } from "react";
import usePrevious from "./usePrevious";

const bootIntercom = viewer => {
  if (!window.Intercom) return null;

  let data = {
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
  if (!process.env.INTERCOM_APP_ID) return null;

  const previousPath = usePrevious(location.pathname);
  const previousViewer = usePrevious(viewer);

  useEffect(() => {
    bootIntercom(viewer);

    return () => {
      window.Intercom("shutdown");
    };
  }, []);

  useEffect(() => {
    if (window.Intercom) {
      // If the user has just logged out. i.e there was a viewer and now there
      // isn't then do a reboot to clear conversations.
      if (Boolean(previousViewer) && !Boolean(viewer)) {
        window.Intercom("shutdown");
        bootIntercom(viewer);
        return;
      }

      // If the user has changed then reboot
      if (viewer && get(previousViewer, "id") !== get(viewer, "id")) {
        window.Intercom("shutdown");
        bootIntercom(viewer);
      }
    }
  }, [viewer]);

  useEffect(() => {
    if (previousPath !== location.pathname && Boolean(window.Intercom)) {
      window.Intercom("update");
    }
  }, [location.pathname]);
};

export default useIntercom;
