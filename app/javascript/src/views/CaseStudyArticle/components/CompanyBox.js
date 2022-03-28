import React from "react";

export default function CompanyBox({ caseStudy }) {
  return (
    <div className="flex gap-4">
      <div className="flex gap-2 items-center">
        <img src={caseStudy.company.favicon} />
        <span className="text-xl">{caseStudy.company.name}</span>
      </div>
      <div>
        <div className="uppercase">type</div>
        <div>{caseStudy.company.businessType}</div>
      </div>
      <div>
        <div className="uppercase">industry</div>
        <div>{caseStudy.company.businessType}</div>
      </div>
      <div>
        <div className="uppercase">focus</div>
        <div>{caseStudy.company.businessType}</div>
      </div>
      <div>
        <div className="uppercase">website</div>
        <div>NONE</div>
      </div>
    </div>
  );
}
