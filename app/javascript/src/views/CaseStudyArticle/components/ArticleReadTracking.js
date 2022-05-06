import React, { useMemo, useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { trackEvent } from "src/utilities/segment";

const TIME_TO_READ = 180000; // 3 minutes

// Tracks the time spent reading the article and fires various events to Segment.com
function ArticleReadTracking({ article }) {
  const timer = useRef(null);
  const timeSpentRef = useRef(null);
  const [focused, setFocused] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);

  const trackReadEvent = useCallback(() => {
    trackEvent("Read Case Study", {
      id: article.id,
      slug: article.slug,
    });
  }, [article]);

  useEffect(() => {
    if (!focused) return;

    timer.current = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    return () => clearInterval(timer.current);
  }, [focused]);

  // Also store the time spent inside of a ref. We do this so that we can use
  // the valud inside of the Left case study event without re running the
  // effect.
  useEffect(() => {
    timeSpentRef.current = timeSpent;
  }, [timeSpent]);

  useEffect(() => {
    trackEvent("Viewed Case Study", {
      id: article.id,
      slug: article.slug,
    });
  }, [article]);

  // Track window focus so that we pause the timer when the user switches tabs.
  useEffect(() => {
    const handleFocus = (e) => {
      setFocused(true);
    };

    const handleBlur = (e) => {
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

  const pastTimeToRead = useMemo(() => timeSpent >= TIME_TO_READ, [timeSpent]);

  useEffect(() => {
    if (pastTimeToRead) {
      trackReadEvent();
    }
  }, [pastTimeToRead, trackReadEvent]);

  // Track when the user leaves the case study
  useEffect(() => {
    function trackLeftEvent() {
      trackEvent("Left Case Study", {
        id: article.id,
        slug: article.slug,
        timeSpent: timeSpentRef.current,
      });
    }

    function handleUnload(e) {
      trackLeftEvent();
    }

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      trackLeftEvent();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [article]);

  return null;
}

export default withErrorBoundary(ArticleReadTracking);
