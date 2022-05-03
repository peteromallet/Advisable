import React from "react";
import { useBreakpoint } from "@advisable/donut";
import { PlusSm } from "@styled-icons/heroicons-solid";
import Favicon from "src/components/Favicon";
import Avatar from "src/components/Avatar";

export default function SpecialistCompanyRelation({ specialist, company }) {
  const isDesktop = useBreakpoint("lUp");

  return (
    <div className="flex relative items-center mb-4 justify-center lg:justify-start">
      <Avatar
        src={specialist.avatar}
        size={isDesktop ? "lg" : "lg"}
        name={specialist.name}
      />
      <div className="flex items-center justify-center shadow p-px rounded-full bg-white w-[28px] h-[28px] -mx-1.5 z-[1]">
        <PlusSm className="w-4 h-4" />
      </div>
      <div className="w-[52px] h-[52px] rounded-full bg-neutral200 grid place-items-center">
        <Favicon src={company?.favicon} size="sm" />
      </div>
    </div>
  );
}
