import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import Availability from "./Availability";

export default function SidebarCard({ specialist }) {
  const { timezone } = specialist.account;
  const time = timezone && DateTime.now().setZone(specialist.account.timezone);
  const timezoneFormat = time?.toFormat("ZZZZ '(UTC'Z)");
  const [clock, setClock] = useState(time?.toFormat("hh:mm"));

  useEffect(() => {
    const updateClockInterval =
      time &&
      setInterval(
        () =>
          setClock(
            DateTime.now()
              .setZone(specialist.account.timezone)
              .toFormat("hh:mm"),
          ),
        [1000],
      );
    return () => clearInterval(updateClockInterval);
  }, [specialist.account.timezone, time]);

  return (
    <div className="min-w-[320px] rounded-3xl bg-white drop-shadow p-8 pt-10 flex flex-col">
      <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-6">
        <img src={specialist.avatar} className="h-full w-full object-cover" />
      </div>
      <Link to={specialist.profilePath}>
        <h4 className="font-bold text-3xl">{specialist.name}</h4>
      </Link>
      <Availability unavailableUntil={specialist.unavailableUntil} />
      <hr />
      <span>{specialist.location}</span>
      <span>{timezoneFormat}</span>
      <span>{clock}</span>
      <hr />
      <p>{specialist.bio}</p>
    </div>
  );
}
