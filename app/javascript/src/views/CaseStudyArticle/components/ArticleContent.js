import React from "react";
import Images from "./Images";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

const CONTENT_TYPES = {
  Images,
  Heading,
  Results: null,
  Paragraph,
};

function CaseStudyContentBlock({ content }) {
  const Component = CONTENT_TYPES[content.__typename];
  if (!Component) return null;
  return <Component {...content} />;
}

export default function ArticleContent({ caseStudy }) {
  return (
    <div>
      {caseStudy.sections.map((section) => (
        <div key={section.id}>
          <h6 className="text-sm uppercase font-[550] leading-5">
            {section.type}
          </h6>
          {section.contents.map((content) => (
            <CaseStudyContentBlock content={content} key={content.id} />
          ))}
        </div>
      ))}
    </div>
  );
}
