// DEPRECATED. Use useLoadImage hook instead.

import { useEffect, useState } from "react";

function useImageOnLoad(url) {
  const [loaded, setLoaded] = useState(false);
  // 'updated' is true when a new url is loaded
  const [updated, setUpdated] = useState();

  useEffect(() => {
    setUpdated((u) => u && false);
    if (!url) return;
    const img = new Image();
    img.onload = () => {
      setLoaded(true);
      setUpdated(true);
    };
    img.src = url;
  }, [url]);

  return { loaded, updated };
}

export default useImageOnLoad;
