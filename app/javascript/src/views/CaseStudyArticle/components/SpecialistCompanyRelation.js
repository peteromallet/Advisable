import React from "react";
import { useBreakpoint } from "@advisable/donut";
import { PlusSm } from "@styled-icons/heroicons-solid";
import SuperEllipse from "react-superellipse";
import LogoMark from "src/components/LogoMark";
import PassportAvatar from "src/components/PassportAvatar";

export default function SpecialistCompanyRelation({ specialist, company }) {
  const isDesktop = useBreakpoint("lUp");

  return (
    <div className="flex relative items-center mb-4 lg:mb-6 justify-center lg:justify-start">
      <PassportAvatar
        src={specialist.avatar}
        size={isDesktop ? "sm" : "lg"}
        name={specialist.name}
      />
      <div className="flex items-center justify-center p-px rounded-full bg-white w-[28px] lg:w-[22px] h-[28px] lg:h-[22px] -mx-1.5 lg:-mx-1 z-[1]">
        <PlusSm />
      </div>
      <SuperEllipse
        r1={0.1}
        r2={0.362}
        className="flex bg-gray-200 w-[84px] h-[96px] lg:w-[42px] lg:h-[48px] items-center justify-center"
      >
        {company?.favicon ? (
          <img
            className="rounded w-8 h-8 lg:w-6 lg:h-6"
            src={company?.favicon}
          />
        ) : (
          <LogoMark size={isDesktop ? 16 : 20} color="blue" />
        )}
      </SuperEllipse>
    </div>
  );
}
