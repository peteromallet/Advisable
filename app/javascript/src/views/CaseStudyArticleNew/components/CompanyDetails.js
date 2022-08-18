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
      <div className="mb-1.5 text-xs font-semibold tracking-wide leading-none uppercase text-neutral500">
        Company details
      </div>
      <div className="flex gap-2 py-3 border-b border-solid last:border-none border-b-neutral100">
        <Favicon src={favicon} size="xs" />
        {website ? (
          <a
            href={website?.href}
            target="_blank"
            rel="noreferrer"
            aria-label="Company website"
            className="flex gap-1 items-center leading-none font-[450] text-blue500"
          >
            {name}
            <div className="w-[18px] h-[18px]">
              <ExternalLink />
            </div>
          </a>
        ) : (
          <div className="font-medium text-neutral700">{name}</div>
        )}
      </div>

      {companyType && (
        <div className="flex gap-2 py-3 border-b border-solid last:border-none border-b-neutral100">
          <div className="min-w-[24px] h-[24px]">
            <Truck size={24} className="stroke-neutral700" />
          </div>
          <div className="font-medium text-neutral700">{companyType}</div>
        </div>
      )}

      {businessType && (
        <div className="flex gap-2 py-3">
          <div className="min-w-[24px] h-[24px]">
            <Briefcase size={24} className="stroke-neutral700" />
          </div>
          <div className="font-medium text-neutral700">{businessType}</div>
        </div>
      )}
    </div>
  );
}
