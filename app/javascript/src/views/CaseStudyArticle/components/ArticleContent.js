import React from "react";
import Images from "./Images";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import SimilarArticles from "./SimilarArticles";
import { useLocation } from "react-router-dom";
import LimitedContentSignup from "./LimitedContentSignup";

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

function LimitedContent({ elements }) {
  const content = elements.slice(0, 2);
  return (
    <>
      <div className="relative">
        <div className="absolute right-0 bottom-0 left-0 h-[200px] fade-to-white" />
        {content.map((element, index) => (
          <CaseStudyContentBlock
            element={element}
            key={element.id}
            data-content-block={index}
          />
        ))}
      </div>
      <LimitedContentSignup />
    </>
  );
}

export default function ArticleContent({ caseStudy }) {
  const location = useLocation();
  const locationState = location.state || {};

  const elements = caseStudy.sections.flatMap((section) =>
    section.contents.map((cont) => ({
      ...cont,
      section: { id: section.id, type: section.type },
    })),
  );

  if (locationState.limitedView) {
    return <LimitedContent elements={elements} />;
  }

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
