import React, { useLayoutEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import PassportAvatar from "src/components/PassportAvatar";
import ConnectButton from "src/components/ConnectButton";
import BackButton from "src/components/BackButton";

const Availability = ({ unavailableUntil }) => {
  const color = unavailableUntil ? "bg-neutral600" : "bg-blue500";
  return (
    <div className="flex justify-items-center items-center">
      <div className={`h-[6px] w-[6px] ${color} rounded-full mr-1`} />
      <div className="text-xs font-[430] text-neutral600 leading-3">
        {unavailableUntil ? "Unavailable for hire" : "Available for hire"}
      </div>
    </div>
  );
};

export default function SpecialistBar({ specialist }) {
  const location = useLocation();
  const { back } = location.state || {};

  return (
    <div className="sticky top-[var(--header-height)] left-0 right-0 bg-white h-[72px] shadow transition-all z-[2]">
      <div className="px-6 sm:px-8 md:px-0 w-full md:max-w-[696px] lg:max-w-[960px] xl:max-w-[1198px] h-full mx-auto flex items-center justify-between">
        {back && <BackButton to={back} className="mr-4" />}
        <div className="flex gap-3 items-center h-full">
          <Link to={specialist.profilePath}>
            <PassportAvatar
              size="xs"
              src={specialist.avatar}
              name={specialist.name}
            />
          </Link>
          <div>
            <Link to={specialist.profilePath}>
              <div className="text-lg font-[620] mb-1 leading-none tracking-tight">
                {specialist.name}
              </div>
            </Link>
            <Availability unavailableUntil={specialist.unavailableUntil} />
          </div>
        </div>
        <ConnectButton specialist={specialist} className="ml-auto">
          Connect
        </ConnectButton>
      </div>
    </div>
  );
}
