import { useEffect, useState } from "react";

function useLoadImage(url) {
  const [isLoading, setLoading] = useState(true);
  const [updated, setUpdated] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    setUpdated((u) => u && false);
    if (!url) {
      setLoading(false);
    }

    const img = new Image();
    img.onload = () => {
      setLoading(false);
      setUpdated(true);
    };

    img.onerror = (e) => {
      setLoading(false);
      setError(e);
    };

    img.src = url;
  }, [url]);

  return { isLoading, updated, url, error };
}

export default useLoadImage;
