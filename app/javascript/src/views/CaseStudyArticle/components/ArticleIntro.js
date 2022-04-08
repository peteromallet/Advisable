import React from "react";
import CompanyBox from "./CompanyBox";
import Achievements from "./Achievements";
import AdvisableComment from "./AdvisableComment";
import SpecialistCompanyRelation from "./SpecialistCompanyRelation";

export default function ArticleIntro({ caseStudy }) {
  return (
    <div className="pb-20">
      <SpecialistCompanyRelation
        company={caseStudy.company}
        specialist={caseStudy.specialist}
      />
      <h1 className="text-5xl text-slate-900 leading-[48px] font-extrabold mb-7 tracking-tight">
        {caseStudy.title}
      </h1>
      <CompanyBox caseStudy={caseStudy} />
      <AdvisableComment caseStudy={caseStudy} />
      <Achievements sections={caseStudy.sections} />
    </div>
  );
}
