import React, { createElement } from "react";
import Images from "./Images";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Podcast from "./PodcastContent";

const CONTENT_TYPES = {
  Images,
  Heading,
  Results: null,
  Paragraph,
  Podcast,
};

function CaseStudyContentBlock({ block, ...props }) {
  const component = CONTENT_TYPES[block.__typename];
  if (!component) return null;
  return createElement(component, { block, ...props });
}

export default function ArticleContent({ caseStudy }) {
  return (
    <div className="max-w-[680px]">
      {caseStudy.sections.map((section) => (
        <div key={section.id} className="pb-12">
          <h6 className="inline text-sm leading-5 text-transparent uppercase bg-clip-text bg-gradient-to-r font-[550] from-blue500 to-purple500">
            {section.type}
          </h6>
          {section.contents.map((block) => (
            <CaseStudyContentBlock key={block.id} block={block} />
          ))}
        </div>
      ))}
    </div>
  );
}
