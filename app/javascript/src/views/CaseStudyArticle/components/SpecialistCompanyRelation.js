import React from "react";
import { PlusSm } from "@styled-icons/heroicons-solid";
import SuperEllipse from "react-superellipse";
import LogoMark from "src/components/LogoMark";
import PassportAvatar from "src/components/PassportAvatar";

export default function SpecialistCompanyRelation({ specialist, company }) {
  return (
    <div className="inline-flex gap-3 relative items-center mb-6">
      <PassportAvatar
        src={specialist.avatar}
        size="sm"
        name={specialist.name}
      />
      <SuperEllipse
        r1={0.1}
        r2={0.362}
        className="flex bg-gray-200 h-[48px] w-[42px] items-center justify-center"
      >
        {company?.favicon ? (
          <img className="rounded w-6 h-6" src={company?.favicon} />
        ) : (
          <LogoMark size={16} color="blue" />
        )}
      </SuperEllipse>
      <div className="absolute inset-0 m-auto flex items-center justify-center p-px rounded-full bg-white w-[22px] h-[22px]">
        <PlusSm />
      </div>
    </div>
  );
}
