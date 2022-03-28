import React from "react";

const Divider = () => <div className="w-px h-8 bg-slate-400" />;

export default function CompanyBox({ caseStudy }) {
  return (
    <div className="flex items-center gap-4 border border-solid border-slate-400 rounded-[20px] px-6 py-4">
      <div className="flex gap-2 items-center">
        <img src={caseStudy.company.favicon} />
        <span className="text-xl">{caseStudy.company.name}</span>
      </div>
      <Divider />
      <div>
        <div className="uppercase">type</div>
        <div>{caseStudy.company.businessType}</div>
      </div>
      <Divider />
      <div>
        <div className="uppercase">industry</div>
        <div>{caseStudy.company.businessType}</div>
      </div>
      <Divider />
      <div>
        <div className="uppercase">focus</div>
        <div>{caseStudy.company.businessType}</div>
      </div>
      <Divider />
      <div>
        <div className="uppercase">website</div>
        <div>NONE</div>
      </div>
    </div>
  );
}
