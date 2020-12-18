import { useEffect } from "react";

export default function useHideIntercom() {
  useEffect(() => {
    if (!window?.Intercom) return null;

    setTimeout(() => {
      window.Intercom("update", {
        hide_default_launcher: true,
      });
    }, 500);

    return () => {
      window.Intercom("update", {
        hide_default_launcher: false,
      });
    };
  }, []);
}
