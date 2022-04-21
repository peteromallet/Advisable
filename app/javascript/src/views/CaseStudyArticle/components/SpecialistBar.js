import React, { useLayoutEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PassportAvatar from "src/components/PassportAvatar";
import ConnectButton from "src/components/ConnectButton";

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
  const [open, setOpen] = useState(false);

  const callback = useCallback((entries) => {
    const isOpen = entries.every((e) => !e.isIntersecting);
    setOpen(isOpen);
  }, []);

  useLayoutEffect(() => {
    const specialistInfo = document.querySelectorAll("#specialistInfo");
    const observer = new IntersectionObserver(callback);
    specialistInfo.forEach((block) => observer.observe(block));

    return () => specialistInfo.forEach((block) => observer.unobserve(block));
  }, [callback]);

  return (
    <div
      style={{
        top: open ? "68px" : "0",
        opacity: open ? 1 : 0,
      }}
      className="fixed left-0 right-0 bg-white h-[72px] shadow transition-all z-[2]"
    >
      <div className="px-6 sm:px-8 md:px-0 w-full md:max-w-[696px] lg:max-w-[960px] xl:max-w-[1198px] h-full mx-auto">
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
          <ConnectButton specialist={specialist} className="ml-auto">
            Connect
          </ConnectButton>
        </div>
      </div>
    </div>
  );
}
