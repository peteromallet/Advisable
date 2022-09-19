import React from "react";
import Linkify from "linkify-react";
import renderLineBreaks from "src/utilities/renderLineBreaks";

export default function CaseStudyParagraph({ block, ...props }) {
  return (
    <p
      className="pt-px mb-9 text-lg leading-8 font-[350] text-neutral900 pb-[3px]"
      {...props}
    >
      <Linkify
        options={{
          target: "_blank",
          rel: "nofollow",
          className: "text-blue600 hover:text-blue500 hover:underline",
        }}
      >
        {renderLineBreaks(block.text)}
      </Linkify>
    </p>
  );
}
