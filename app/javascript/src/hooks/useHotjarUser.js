import { useEffect } from "react";

export default function useHotjarUser(viewer) {
  useEffect(() => {
    if (!window.hj) return;

    if (viewer) {
      window.hj("identify", viewer.id, {
        name: viewer.name,
        UserId: viewer.id,
      });
    } else {
      window.hj("identify", null);
    }
  }, [viewer]);
}
