import { useLayoutEffect } from "react";

export default function useHideIntercom() {
  if (!window?.Intercom) return null;

  useLayoutEffect(() => {
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
