import React from "react";
import Linkify from "linkify-react";
import renderLineBreaks from "src/utilities/renderLineBreaks";

export default function CaseStudyParagraph({ text }) {
  return (
    <p className="font-normal text-xl leading-8">
      <Linkify>{renderLineBreaks(text)}</Linkify>
    </p>
  );
}
