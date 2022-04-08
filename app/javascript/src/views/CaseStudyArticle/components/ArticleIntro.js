import { PlusSm } from "@styled-icons/heroicons-solid";
import SuperEllipse from "react-superellipse";
import React from "react";
import PassportAvatar from "src/components/PassportAvatar";
import CompanyBox from "./CompanyBox";

const NUM_TO_WORD = ["first", "second", "third", "fourth", "fifth", "sixth"];

function Achievements({ caseStudy }) {
  const achievements = caseStudy.sections
    .find((s) => s.type === "outcome")
    .contents.find((c) => c.__typename === "Results").results;

  return (
    <div>
      {achievements.map((achievement, index) => (
        <div
          key={`achievement-${index}`}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[32px] text-slate-400 leading-8 font-[550]">
            {index + 1}
          </span>
          <div>
            <span className="text-xs leading-3 text-slate-300 font-[550] uppercase">
              {NUM_TO_WORD[index]} achievement
            </span>
            <p className="text-xl text-gray-900">{achievement}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

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
          <img src={caseStudy.company.favicon} className="rounded w-6 h-6" />
        </SuperEllipse>
      </div>
      <h1 className="text-5xl text-slate-900 leading-[48px] font-extrabold mb-7 tracking-tight">
        {caseStudy.title}
      </h1>
      <CompanyBox caseStudy={caseStudy} />
      <div className="px-6 pt-4 pb-5 mb-5 bg-gray-50 rounded-lg border-gray-300 border-solid border">
        <p className="font-[550] text-lg text-slate-900">
          We&apos;re recommending {caseStudy.specialist.firstName} base on their
          project with {caseStudy.company.name}
        </p>
        <p className="text-lg font-[350]">{caseStudy.comment}</p>
      </div>
      <Achievements caseStudy={caseStudy} />
    </div>
  );
}
