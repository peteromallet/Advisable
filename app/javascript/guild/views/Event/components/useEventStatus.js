import { useEffect, useState, useCallback } from "react";
import { DateTime } from "luxon";

const EventStatus = {
  pending: "pending",
  startingSoon: "startingSoon",
  inProgress: "inProgress",
  ended: "ended",
  default: "pending",
};

const useEventStatus = (event) => {
  const [eventStatus, setEventStatus] = useState(EventStatus.pending);

  const getEventStatus = useCallback(() => {
    if (!event) return null;

    const start = DateTime.fromISO(event.startsAt);
    const end = DateTime.fromISO(event.endsAt);
    const now = DateTime.now();
    const { hours } = start.diff(now, "hours").toObject();

    if (now > start && now < end) {
      return EventStatus.inProgress;
    } else if (hours < 0) {
      return EventStatus.ended;
    } else if (hours <= 1) {
      return EventStatus.startingSoon;
    } else if (hours > 1) {
      return EventStatus.pending;
    }
  }, [EventStatus, event]);

  useEffect(() => {
    const status = getEventStatus();
    setEventStatus(status);
  }, [event, getEventStatus]);

  useEffect(() => {
    if (
      /* 
        timer to track event status transitions: 
        startingSoon -> inProgress OR inProgress -> ended
      */
      eventStatus === EventStatus.startingSoon ||
      eventStatus === EventStatus.inProgress
    ) {
      const timer = setInterval(() => {
        const status = getEventStatus();
        if (eventStatus !== status) {
          setEventStatus(status);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [eventStatus, getEventStatus, EventStatus]);

  return eventStatus;
};

export { useEventStatus, EventStatus };
