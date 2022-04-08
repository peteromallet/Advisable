import React from "react";
import { PlusSm } from "@styled-icons/heroicons-solid";
import SuperEllipse from "react-superellipse";
import LogoMark from "src/components/LogoMark";
import PassportAvatar from "src/components/PassportAvatar";
import CompanyBox from "./CompanyBox";
import Achievements from "./Achievements";
import AdvisableComment from "./AdvisableComment";

export default function ArticleIntro({ caseStudy }) {
  return (
    <div className="pb-20">
      <div className="flex items-center mb-4">
        <PassportAvatar
          src={caseStudy.specialist.avatar}
          size="sm"
          name={caseStudy.specialist.name}
        />
        <div className="flex items-center justify-center p-px rounded-full bg-white w-[22px] h-[22px] mx-[-5px] z-10">
          <PlusSm />
        </div>
        <SuperEllipse
          r1={0.1}
          r2={0.362}
          className="flex bg-gray-200 h-[48px] w-[42px] items-center justify-center"
        >
          {caseStudy.company?.favicon ? (
            <img className="rounded w-6 h-6" src={caseStudy.company?.favicon} />
          ) : (
            <LogoMark size={16} color="blue" />
          )}
        </SuperEllipse>
      </div>
      <h1 className="text-5xl text-slate-900 leading-[48px] font-extrabold mb-7 tracking-tight">
        {caseStudy.title}
      </h1>
      <CompanyBox caseStudy={caseStudy} />
      <AdvisableComment caseStudy={caseStudy} />
      <Achievements sections={caseStudy.sections} />
    </div>
  );
}
