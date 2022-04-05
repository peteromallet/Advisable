import React from "react";
import PassportAvatar from "src/components/PassportAvatar";
import AdvisableComment from "./AdvisableComment";
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
          <span className="text-3xl">{index + 1}</span>
          <div>
            <span className="text-xs font-semibold  uppercase">
              {NUM_TO_WORD[index]} achievement
            </span>
            <p className="text-xl">{achievement}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ArticleIntro({ caseStudy }) {
  return (
    <div>
      <div className="flex">
        <PassportAvatar
          src={caseStudy.specialist.avatar}
          size="sm"
          name={caseStudy.specialist.name}
        />
        <div className="flex bg-gray-200 rounded-md h-[52px] w-11 items-center justify-center">
          <img src={caseStudy.company.favicon} className="rounded w-6 h-6" />
        </div>
      </div>
      <h1 className="text-5xl font-extrabold">{caseStudy.title}</h1>
      <AdvisableComment caseStudy={caseStudy} />
      <CompanyBox caseStudy={caseStudy} />
      <Achievements caseStudy={caseStudy} />
    </div>
  );
}
