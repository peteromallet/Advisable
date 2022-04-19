import React from "react";
import { Link, useBreakpoint } from "@advisable/donut";
import ConnectButton from "src/components/ConnectButton";
import Timezone from "./Timezone";
import Availability from "./Availability";

export default function SidebarCard({ specialist }) {
  const xlUp = useBreakpoint("xlUp");

  return (
    <div
      id="specialistInfo"
      className="hidden lg:flex min-w-[264px] xl:min-w-[320px] w-[264px] xl:w-[320px] rounded-[28px] xl:rounded-[40px] bg-white drop-shadow-xl p-6 xl:p-8 pt-8 xl:pt-10 flex-col"
    >
      <Link
        className="mb-7 mx-auto rounded-full overflow-hidden w-40 xl:w-48 h-40 xl:h-48 border-4 border-neutral100 border-solid hover:border-neutral300"
        to={specialist.profilePath}
      >
        <img
          src={specialist.avatar}
          className="h-full w-full object-cover rounded-full border-2 border-white border-solid"
        />
      </Link>
      <Link to={specialist.profilePath}>
        <h4 className="font-bold xl:text-3xl text-2xl text-neutral800 hover:text-neutral800 xl:leading-8 leading-6 pt-px pb-[3px] mb-1 hover:underline decoration-neutral500">
          {specialist.name}
        </h4>
      </Link>
      <Availability unavailableUntil={specialist.unavailableUntil} />
      <ConnectButton
        className="mb-5 mt-3"
        specialist={specialist}
        size={xlUp ? "lg" : "md"}
      >
        Connect
      </ConnectButton>
      <hr className="border-neutral200 pb-[3px] mb-2" />
      <div className="text-[15px] xl:text-lg font-[450] text-blue900 leading-4 xl:leading-5 xl:mb-1 pt-[3px] pb-px">
        {specialist.location}
      </div>
      <Timezone timezone={specialist.account.timezone} />
      <hr className="border-neutral200 mt-[3px] mb-3" />
      <p className="text-sm xl:text-[1.0625rem] text-neutral900 leading-5 xl:leading-6 pt-px pb-[3px] xl:py-0.5">
        {specialist.bio}
      </p>
    </div>
  );
}
