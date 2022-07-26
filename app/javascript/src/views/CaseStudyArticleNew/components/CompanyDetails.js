import React from "react";
import Favicon from "src/components/Favicon";
import {
  Briefcase,
  ExternalLink,
  Truck,
} from "@styled-icons/heroicons-outline";

export default function CompanyDetails({ caseStudy }) {
  if (!caseStudy.company) return null;
  const { favicon, businessType, name } = caseStudy.company;
  let website;
  try {
    website = new URL(caseStudy.company?.website);
  } catch {
    website = null;
  }
  const companyType = caseStudy.companyType?.[0];

  return (
    <div>
      <div className="leading-none mb-1.5 uppercase text-xs font-semibold text-neutral500 tracking-wide">
        Company details
      </div>
      <div className="flex gap-2 py-3 border-b border-b-neutral100 border-solid last:border-none">
        {favicon && <Favicon src={favicon} size="xs" />}
        {website ? (
          <a
            href={website?.href}
            target="_blank"
            rel="noreferrer"
            className="font-[450] text-blue500 flex gap-1 items-center leading-none"
          >
            {name}
            <div className="w-[18px] h-[18px]">
              <ExternalLink />
            </div>
          </a>
        ) : (
          <div>{name}</div>
        )}
      </div>

      {companyType && (
        <div className="flex gap-2 py-3 border-b border-b-neutral100 border-solid last:border-none">
          <div className="min-w-[24px] h-[24px]">
            <Truck className="stroke-neutral700" />
          </div>
          <div className="text-neutral700 font-medium">{companyType}</div>
        </div>
      )}

      {businessType && (
        <div className="flex gap-2 py-3">
          <div className="min-w-[24px] h-[24px]">
            <Briefcase className="stroke-neutral700" />
          </div>
          <div className="text-neutral700 font-medium">{businessType}</div>
        </div>
      )}
    </div>
  );
}
