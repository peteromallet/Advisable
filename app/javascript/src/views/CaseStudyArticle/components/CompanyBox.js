import React from "react";

const Divider = () => <div className="w-px h-8 bg-gray-300" />;
const Label = ({ children }) => (
  <div className="uppercase text-xs text-gray-400 font-[550]">{children}</div>
);

export default function CompanyBox({ caseStudy }) {
  const website = new URL(caseStudy.company.website);
  return (
    <div className="flex items-center gap-7 mb-5 border border-solid border-gray-300 rounded-[20px] pl-6 pr-8 py-4">
      <div className="flex gap-2 items-center">
        <img src={caseStudy.company.favicon} className="h-8 w-8 rounded" />
        <span className="text-xl">{caseStudy.company.name}</span>
      </div>
      <Divider />
      <div>
        <Label>type</Label>
        <div>{caseStudy.companyType?.[0]}</div>
      </div>
      <Divider />
      <div>
        <Label>focus</Label>
        <div>{caseStudy.company.businessType}</div>
      </div>
      <Divider />
      {!!website && (
        <div>
          <Label>website</Label>
          <div>
            <a
              href={website.href}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              {website.hostname}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
