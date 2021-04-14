import { useEffect } from "react";

export default function useMixpanelUser(viewer) {
  useEffect(() => {
    if (!window.mixpanel) return;

    if (viewer) {
      window.mixpanel.people.set();

      window.mixpanel.people.set({
        $email: viewer.email,
        $name: viewer.name,
      });

      window.mixpanel.identify(viewer.id);
    } else {
      window.mixpanel.reset();
    }
  }, [viewer]);
}
