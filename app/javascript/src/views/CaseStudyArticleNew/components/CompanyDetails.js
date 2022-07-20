import {
  ExternalLink,
  OfficeBuilding,
  Truck,
} from "@styled-icons/heroicons-outline";
import React from "react";
import Favicon from "src/components/Favicon";

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
      <div>Company details</div>
      <div className="flex gap-2">
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
        <div className="flex gap-2">
          <div className="min-w-[24px] h-[24px]">
            <Truck />
          </div>
          <div>{companyType}</div>
        </div>
      )}

      {businessType && (
        <div className="flex gap-2">
          <div className="min-w-[24px] h-[24px]">
            <OfficeBuilding />
          </div>
          <div>{businessType}</div>
        </div>
      )}
    </div>
  );
}
