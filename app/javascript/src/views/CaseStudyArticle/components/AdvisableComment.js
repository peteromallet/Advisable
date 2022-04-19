import React from "react";

export default function AdvisableComment({ caseStudy }) {
  if (!caseStudy.company?.name && !caseStudy.companyType?.[0]) return null;

  return (
    <div className="px-4 xl:px-6 pt-3 pb-4 xl:py-4 mb-6 bg-neutral50 rounded-[20px] xl:rounded-lg ring-neutral200 ring-1 ring-inset">
      <h6 className="font-[550] text-base leading-none xl:text-lg xl:leading-5 text-neutral900 py-0.5 xl:pt-[3px] xl:pb-px mb-1">
        We&apos;re recommending {caseStudy.specialist.firstName} base on their
        project with {caseStudy.company?.name || caseStudy.companyType?.[0]}
      </h6>
      <p className="text-base leading-5 xl:text-lg xl:leading-6 text-neutral900 xl:pt-px xl:pb-[3px] font-[350]">
        {caseStudy.comment}
      </p>
    </div>
  );
}
