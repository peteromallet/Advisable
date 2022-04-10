import { DateTime } from "luxon";
import { Clock } from "@styled-icons/heroicons-solid";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

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
    <div className="flex items-center gap-3 mb-3">
      <div className="text-neutral600 leading-5">{timezoneFormat}</div>
      <div className="w-px h-[16px] bg-neutral600" />
      <div className="flex gap-1 items-center">
        <Clock className="fill-neutral500 w-[16px]" />
        <div className="text-neutral600 leading-5">{clock}</div>
      </div>
    </div>
  );
}
