import React from "react";

export default function AdvisableComment({ caseStudy }) {
  if (!caseStudy.company?.name && !caseStudy.companyType?.[0]) return null;

  return (
    <div className="px-6 pt-4 pb-5 mb-5 bg-gray-50 rounded-lg border-gray-300 border-solid border">
      <p className="font-[550] text-lg text-slate-900">
        We&apos;re recommending {caseStudy.specialist.firstName} base on their
        project with {caseStudy.company?.name || caseStudy.companyType?.[0]}
      </p>
      <p className="text-lg font-[350]">{caseStudy.comment}</p>
    </div>
  );
}
