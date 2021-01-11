import { useEffect } from "react";

export default function useHideIntercom() {
  useEffect(() => {
    if (!window?.Intercom) return null;

    window._hide_intercom = true;
    window.Intercom("update", {
      hide_default_launcher: true,
    });

    return () => {
      window._hide_intercom = false;
      window.Intercom("update", {
        hide_default_launcher: false,
      });
    };
  }, []);
}
