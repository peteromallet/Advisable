import { DateTime } from "luxon";
import { Clock } from "@styled-icons/heroicons-solid";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const TimeText = ({ children }) => (
  <div className="text-neutral600 text-sm xl:text-base leading-4 xl:leading-5 pt-[3px] xl:pt-0 pb-px xl:pb-0">
    {children}
  </div>
);

export default function Timezone({ timezone }) {
  const time = timezone && DateTime.now().setZone(timezone);
  const timezoneFormat = time?.toFormat("ZZZZ '(UTC'Z)");
  const [clock, setClock] = useState(time?.toFormat("hh:mm"));

  useEffect(() => {
    const updateClockInterval =
      time &&
      setInterval(
        () => setClock(DateTime.now().setZone(timezone).toFormat("hh:mm")),
        [1000],
      );
    return () => clearInterval(updateClockInterval);
  }, [timezone, time]);

  if (!timezone) return null;

  return (
    <div className="flex items-center gap-3 pb-1">
      <TimeText>{timezoneFormat}</TimeText>
      <div className="w-px h-3 xl:h-4 bg-neutral600" />
      <div className="flex gap-1 items-center">
        <Clock className="fill-neutral500 w-[16px]" />
        <TimeText>{clock}</TimeText>
      </div>
    </div>
  );
}
