import React, { useReducer } from "react";
import Images from "./Images";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import ArticleSidebar from "./ArticleSidebar";

const CaseStudySection = ({ id, type }) => (
  <h6 className="text-sm uppercase font-[550] leading-5">
    <div id={id} className="relative top-[-92px]" />
    {type}
  </h6>
);

const CONTENT_TYPES = {
  Images,
  Heading,
  Results: null,
  Paragraph,
  CaseStudySection,
};

const scrollReducer = (state, action) => {
  switch (action.type) {
    case "IN_VIEWPORT":
      if (action.payload.element.__typename === "Heading") return state;
      state[action.payload.index] = true;
      return [...state];
    case "OUT_VIEWPORT":
      if (action.payload.element.__typename === "Heading") return state;
      state[action.payload.index] = false;
      return [...state];
  }
};

function CaseStudyContentBlock({ element, ...props }) {
  const Component = CONTENT_TYPES[element.__typename];
  if (!Component) return null;
  return <Component {...element} {...props} />;
}

export default function ArticleContent({ caseStudy }) {
  const [scrollState, dispatch] = useReducer(scrollReducer, []);
  const inViewport = (payload) => dispatch({ type: "IN_VIEWPORT", payload });
  const outViewport = (payload) => dispatch({ type: "OUT_VIEWPORT", payload });

  const elements = caseStudy.sections.flatMap((section) =>
    section.contents.map((cont) => ({
      ...cont,
      section: { id: section.id, type: section.type },
    })),
  );

  return (
    <div className="flex gap-20 pt-16">
      <ArticleSidebar elements={elements} scrollState={scrollState} />
      <div>
        {elements.map((element, index) => (
          <CaseStudyContentBlock
            element={element}
            inViewport={inViewport}
            outViewport={outViewport}
            key={element.id}
            onViewportEnter={() => inViewport({ index, element })}
            onViewportLeave={() => outViewport({ index, element })}
            viewport={{
              margin: "0px 0px -50% 0px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
