import { useEffect, useCallback } from "react";
import * as Sentry from "@sentry/react";

export default function useSentryUser(viewer) {
  const clearSentryUser = useCallback(() => {
    Sentry.configureScope((scope) => {
      scope.setUser(null);
    });
  }, []);

  useEffect(() => {
    if (!Sentry) return;
    if (viewer) {
      const user = {
        id: viewer.id,
        email: viewer.email,
        username: viewer.name,
      };

      if (window.advisableAdmin) {
        user.admin = window.advisableAdmin;
      }

      Sentry.configureScope((scope) => {
        scope.setUser(user);
      });
    } else {
      clearSentryUser();
    }

    return clearSentryUser;
  }, [viewer, clearSentryUser]);
}
