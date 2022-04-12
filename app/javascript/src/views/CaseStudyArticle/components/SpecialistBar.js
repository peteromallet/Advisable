import React, { useLayoutEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PassportAvatar from "src/components/PassportAvatar";
import ConnectButton from "src/components/ConnectButton";

const Availability = ({ unavailableUntil }) => (
  <div className="flex justify-items-center items-center">
    {unavailableUntil ? (
      <>
        <div className="h-[6px] w-[6px] bg-gray-600 rounded-full mr-1" />
        <div className="text-xs font-[430] leading-3">Unavailable for hire</div>
      </>
    ) : (
      <>
        <div className="h-[6px] w-[6px] bg-blue-700 rounded-full mr-1" />
        <div className="text-xs font-[430] leading-3"> Available for hire </div>
      </>
    )}
  </div>
);

export default function SpecialistBar({ specialist }) {
  const [open, setOpen] = useState(false);

  const callback = useCallback((entries) => {
    const [entry] = entries;
    setOpen(!entry.isIntersecting);
  }, []);

  useLayoutEffect(() => {
    const sidebar = document.querySelector("#specialistInfo");
    const observer = new IntersectionObserver(callback);
    observer.observe(sidebar);

    return () => observer.unobserve(sidebar);
  }, [callback]);

  return (
    <div
      style={{
        top: open ? "68px" : "0",
        opacity: open ? 1 : 0,
      }}
      className="fixed left-0 right-0 bg-white h-[72px] shadow transition-all"
    >
      <div className="max-w-[1198px] h-full mx-auto">
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
              <div className="text-xl font-[650] leading-5 mb-1">
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
