import React from "react";
import Linkify from "linkify-react";
import renderLineBreaks from "src/utilities/renderLineBreaks";

export default function CaseStudyParagraph({ text, ...props }) {
  return (
    <p
      className="font-[350] text-xl text-neutral900 leading-8 pt-px pb-[3px] mb-9"
      {...props}
    >
      <Linkify
        options={{
          className: "text-blue600 hover:text-blue500 hover:underline",
        }}
      >
        {renderLineBreaks(text)}
      </Linkify>
    </p>
  );
}
