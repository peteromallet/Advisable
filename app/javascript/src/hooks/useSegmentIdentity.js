import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePrevious from "src/utilities/usePrevious";

export default function useSegmentIdentity(viewer) {
  const location = useLocation();
  const previousID = usePrevious(viewer?.id);

  useEffect(() => {
    if (!window.analytics) return;
    window.analytics.page();
  }, [location]);

  useEffect(() => {
    if (!window.analytics) return;

    // Viewer logged out
    if (previousID && !viewer) {
      window.analytics.reset();
      return;
    }

    // Clear out the session if the user is an admin
    if (viewer?.isAdmin) {
      window.analytics.reset();
      return;
    }

    if (viewer) {
      const traits = {
        name: viewer.name,
        email: viewer.email,
        account_type: viewer.__typename === "User" ? "Client" : "Freelancer",
      };

      if (viewer.__typename === "User") {
        traits.company = {
          id: viewer.company.id,
          name: viewer.company.name,
        };
      }

      window.analytics.identify(viewer.account.id, traits);
    }
  }, [viewer, previousID]);
}
