import React from "react";

export default function AdvisableComment({ caseStudy }) {
  if (!caseStudy.company?.name && !caseStudy.companyType?.[0]) return null;

  return (
    <div className="px-6 py-4 mb-6 bg-neutral50 rounded-lg ring-neutral200 ring-1 ring-inset">
      <h6 className="font-[550] text-lg leading-5 text-neutral900 pt-[3px] pb-px mb-1">
        We&apos;re recommending {caseStudy.specialist.firstName} base on their
        project with {caseStudy.company?.name || caseStudy.companyType?.[0]}
      </h6>
      <p className="text-lg leading-6 text-neutral900 pt-px pb-[3px] font-[350]">
        {caseStudy.comment}
      </p>
    </div>
  );
}
