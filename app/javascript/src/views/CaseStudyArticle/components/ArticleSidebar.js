import React from "react";

export default function ArticleSidebar({ caseStudy }) {
  const sections = caseStudy.sections.map((section) => {
    return {
      section: section.type,
      header: section.contents.find(
        (content) => content.__typename == "Heading",
      )?.text,
      subheaders: section.contents
        .filter((content) => content.size == "h2")
        ?.map((c) => c.text),
    };
  });

  return (
    <div className="min-w-[320px]">
      {sections.map((section, index) => (
        <div key={`menu-section-${index}`}>
          <span>{section.section}</span>
          <h6>{section.header}</h6>
          <div>
            {section.subheaders.map((subheader, index) => (
              <h6 key={`${section.section}-subheader-${index}`}>{subheader}</h6>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
