import React from "react";

export default function AdvisableComment({ caseStudy }) {
  return (
    <div className="px-6 pt-4 pb-5 bg-gray-100 rounded-lg">
      <p>
        We&apos;re recommending {caseStudy.specialist.firstName} base on their
        project with {caseStudy.company.name}
      </p>
      <p>{caseStudy.comment}</p>
    </div>
  );
}
