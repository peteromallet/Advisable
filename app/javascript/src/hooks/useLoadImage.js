import { useEffect, useState } from "react";

function useLoadImage(url) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    if (!url) {
      setLoading(false);
    }

    const img = new Image();
    img.onload = () => {
      setLoading(false);
    };

    img.onerror = (e) => {
      setLoading(false);
      setError(e);
    };

    img.src = url;
  }, [url]);

  return { isLoading, url, error };
}

export default useLoadImage;
