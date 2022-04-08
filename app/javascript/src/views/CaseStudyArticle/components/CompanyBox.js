import React from "react";

const Divider = () => <div className="w-px h-8 bg-gray-300 last:hidden" />;

const Item = ({ children, label, hidden, ...props }) => {
  if (!children || hidden === true) return null;

  return (
    <>
      <div {...props}>
        {Boolean(label) && (
          <div className="uppercase text-xs text-gray-400 font-[550]">
            {label}
          </div>
        )}
        {children}
      </div>
      <Divider />
    </>
  );
};

export default function CompanyBox({ caseStudy }) {
  if (!caseStudy.company) return null;

  const { favicon, businessType, name } = caseStudy.company;
  const website = new URL(caseStudy.company?.website);
  const companyType = caseStudy.companyType?.[0];

  return (
    <div className="flex items-center gap-7 mb-5 border border-solid border-gray-300 rounded-[20px] pl-6 pr-8 py-4">
      <Item className="flex gap-2 items-center">
        <img src={favicon} className="h-8 w-8 rounded" />
        <span className="text-xl">{name}</span>
      </Item>
      <Item label="type" hidden={!companyType}>
        <span>{companyType}</span>
      </Item>
      <Item label="focus" hidden={!businessType}>
        <span>{businessType}</span>
      </Item>
      <Item label="website" hidden={!website}>
        <a
          href={website?.href}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600"
        >
          {website?.hostname}
        </a>
      </Item>
    </div>
  );
}
