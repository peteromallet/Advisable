import React from "react";
import Favicon from "src/components/Favicon";
import composeStyles from "src/utilities/composeStyles";

const wrapperStyles = composeStyles({
  base: `
    flex
    flex-col
    sm:flex-row
    ring-1
    ring-inset
    ring-neutral200
    sm:items-center
    gap-5
    sm:gap-7
    mb-5
    rounded-[20px]
    pl-6
    pr-8
    py-4
  `,
});

const Divider = () => (
  <div className="w-px h-8 hidden sm:block bg-neutral200 last:hidden" />
);

const Item = ({ children, label, hidden, ...props }) => {
  if (!children || hidden === true) return null;

  return (
    <>
      <div {...props}>
        {Boolean(label) && (
          <div className="uppercase text-xs leading-4 text-neutral400 font-[550]">
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
  let website;
  try {
    website = new URL(caseStudy.company?.website);
  } catch {
    website = null;
  }
  const companyType = caseStudy.companyType?.[0];

  return (
    <div className={wrapperStyles({ wrapperStyles })}>
      <Item className="flex gap-2 items-center">
        {favicon && <Favicon src={favicon} />}
        <div className="text-xl font-[450] text-neutral900">{name}</div>
      </Item>
      <Item label="type" hidden={!companyType}>
        <div className="font-[450] text-neutral900 leading-5">
          {companyType}
        </div>
      </Item>
      <Item label="focus" hidden={!businessType}>
        <div className="font-[450] text-neutral900 leading-5">
          {businessType}
        </div>
      </Item>
      <Item label="website" hidden={!website}>
        <a
          href={website?.href}
          target="_blank"
          rel="noreferrer"
          className="font-[450] text-blue500 leading-5"
        >
          {website?.hostname}
        </a>
      </Item>
    </div>
  );
}
