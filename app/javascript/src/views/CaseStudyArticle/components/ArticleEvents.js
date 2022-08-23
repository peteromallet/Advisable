import { useCallback, useMemo, useRef, useState } from "react";
import { useEffect, useLayoutEffect } from "react";
import { trackEvent } from "src/utilities/segment";

const TIME_TO_READ = 180000; // 3 minutes

export default function ArticleEvents({ article }) {
  const timer = useRef(null);
  const timeSpentRef = useRef(null);
  const readEventTriggeredRef = useRef(false);
  const [focused, setFocused] = useState(true);

  const id = useMemo(() => article?.id, [article]);
  const payload = useMemo(() => ({ article: id }), [id]);

  // Reset timer, readEventTriggered and fire view event.
  useEffect(() => {
    trackEvent("Viewed Case Study", payload);
    timeSpentRef.current = 0;
    readEventTriggeredRef.current = false;
  }, [payload]);

  const trackReadEvent = useCallback(() => {
    trackEvent("Read Case Study", payload);
  }, [payload]);

  useLayoutEffect(() => {
    if (!focused) return;

    function tick() {
      timeSpentRef.current += 1;
      const pastTimeToRead = timeSpentRef.current >= TIME_TO_READ;
      if (pastTimeToRead && !readEventTriggeredRef.current) {
        readEventTriggeredRef.current = true;
        trackReadEvent();
      }
    }

    timer.current = setInterval(tick, 1000);
    return () => clearInterval(timer.current);
  }, [focused, trackReadEvent]);

  // Track window focus so that we pause the timer when the user switches tabs.
  useEffect(() => {
    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = () => {
      clearInterval(timer.current);
      setFocused(false);
    };

    document.addEventListener("blur", handleBlur);
    document.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("blur", handleBlur);
      document.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Track when the user leaves the case study
  useEffect(() => {
    function trackLeftEvent() {
      trackEvent("Left Case Study", {
        ...payload,
        timeSpent: timeSpentRef.current,
      });
    }

    function handleUnload() {
      trackLeftEvent();
    }

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      trackLeftEvent();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [payload]);

  return null;
}
