import { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  const interval = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay !== null) {
      if (interval.current) clearInterval(interval.current);
      interval.current = setInterval(tick, delay);
      return () => clearInterval(interval.current);
    }
  }, [delay]);

  const resetInterval = () => {
    clearInterval(interval.current);
    const tick = () => savedCallback.current();
    interval.current = setInterval(tick, delay);
  };

  return { resetInterval };
};

export default useInterval;
