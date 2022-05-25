import React from "react";
import Images from "./Images";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import ArticleSidebar from "./ArticleSidebar";
import SimilarArticles from "./SimilarArticles";
import Review from "./Review";

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
      <ArticleSidebar elements={elements} />
      <div>
        {elements.map((element, index) => (
          <CaseStudyContentBlock
            element={element}
            key={element.id}
            data-content-block={index}
          />
        ))}
        <Review
          data-content-block={elements.length}
          review={caseStudy.review}
        />
        <SimilarArticles
          data-content-block={elements.length + 1}
          articles={caseStudy.similar}
        />
      </div>
    </>
  );
}
