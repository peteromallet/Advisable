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
      Sentry.configureScope((scope) => {
        scope.setUser({
          id: viewer.id,
          email: viewer.email,
          username: viewer.name,
        });
      });
    } else {
      clearSentryUser();
    }

    return clearSentryUser;
  }, [viewer, clearSentryUser]);
}
