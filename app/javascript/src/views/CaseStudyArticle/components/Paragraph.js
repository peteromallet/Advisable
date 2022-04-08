import React from "react";
import { motion } from "framer-motion";
import Linkify from "linkify-react";
import renderLineBreaks from "src/utilities/renderLineBreaks";

export default function CaseStudyParagraph({ text, ...props }) {
  return (
    <motion.p
      className="font-[350] text-xl leading-8 pt-px pb-[3px] mb-9"
      {...props}
    >
      <Linkify>{renderLineBreaks(text)}</Linkify>
    </motion.p>
  );
}
