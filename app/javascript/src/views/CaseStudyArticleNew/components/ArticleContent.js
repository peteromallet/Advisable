import React from "react";
import Images from "./Images";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import SimilarArticles from "./SimilarArticles";

const CONTENT_TYPES = {
  Images,
  Heading,
  Results: null,
  Paragraph,
};

function CaseStudyContentBlock({ element, ...props }) {
  const Component = CONTENT_TYPES[element.__typename];
  if (!Component) return null;
  return <Component {...element} {...props} />;
}

export default function ArticleContent({ caseStudy }) {
  const elements = caseStudy.sections.flatMap((section) =>
    section.contents.map((cont) => ({
      ...cont,
      section: { id: section.id, type: section.type },
    })),
  );

  return (
    <>
        {elements.map((element, index) => (
          <CaseStudyContentBlock
            element={element}
            key={element.id}
            data-content-block={index}
          />
        ))}
        <SimilarArticles
          data-content-block={elements.length}
          articles={caseStudy.similar}
        />
    </>
  );
}
