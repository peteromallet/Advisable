import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { ChatAlt, Clock } from "@styled-icons/heroicons-solid";
import Button from "src/components/Button";

const Availability = ({ unavailableUntil }) => (
  <div className="flex justify-items-center items-center mb-4">
    {unavailableUntil ? (
      <>
        <div className="h-2.5 w-2.5 bg-gray-600 rounded-full mr-2" />
        <p>Unavailable for hire</p>
      </>
    ) : (
      <>
        <div className="h-2.5 w-2.5 bg-blue-700 rounded-full mr-2" />
        <p> Available for hire </p>
      </>
    )}
  </div>
);

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
    <div className="min-w-[320px] w-[320px] rounded-[40px] bg-white drop-shadow p-8 pt-10 flex flex-col">
      <Link to={specialist.profilePath}>
        <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-6">
          <img src={specialist.avatar} className="h-full w-full object-cover" />
        </div>
      </Link>
      <Link to={specialist.profilePath}>
        <h4 className="font-bold text-3xl leading-8 mb-0.5">
          {specialist.name}
        </h4>
      </Link>
      <Availability
        unavailableUntil={specialist.unavailableUntil}
        className="mb-5"
      />
      <Button prefix={<ChatAlt />} variant="primary" size="lg" className="mb-4">
        Connect
      </Button>
      <div className="border-y border-solid border-gray-300 pt-4 pb-5 mb-4">
        <span className="text-lg leading-5">{specialist.location}</span>
        <div className="flex items-center gap-3">
          <span className="text-gray-600 leading-5 mb-1">{timezoneFormat}</span>
          <div className="w-px h-[16px] bg-gray-400" />
          <div className="flex gap-1">
            <Clock className="fill-gray-400 w-[16px]" />
            <span className="text-gray-600 leading-5">{clock}</span>
          </div>
        </div>
      </div>
      <p className="text-[1.0625rem] leading-6">{specialist.bio}</p>
    </div>
  );
}
