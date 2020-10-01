import { useEffect, useState } from "react";

function useImageOnLoad(url) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = url;
  }, [url]);

  return loaded;
}

export default useImageOnLoad;
