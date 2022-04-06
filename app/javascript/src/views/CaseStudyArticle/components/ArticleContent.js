import React, { useReducer } from "react";
import { motion } from "framer-motion";
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
      console.log("in viewport", action, state);
      state[action.payload] = true;
      return [...state];
    case "OUT_VIEWPORT":
      console.log("out of viewport", action, state);
      state[action.payload] = false;
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

  console.log("elements", elements);

  return (
    <div className="flex gap-20">
      <ArticleSidebar elements={elements} scrollState={scrollState} />
      <div>
        {elements.map((element, index) => (
          <motion.div
            key={element.id}
            onViewportEnter={() => inViewport(index)}
            onViewportLeave={() => outViewport(index)}
          >
            <CaseStudyContentBlock
              element={element}
              inViewport={inViewport}
              outViewport={outViewport}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
