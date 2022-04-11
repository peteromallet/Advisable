import React from "react";
import { motion } from "framer-motion";

const Heading = ({ id, section, ...props }) => (
  <motion.div className="first:mt-0 mt-20" {...props}>
    <h6 className="text-sm uppercase font-[550] leading-5 bg-clip-text text-transparent bg-gradient-to-r from-blue500 to-purple500">
      <div id={id} className="relative top-[-180px]" />
      {section.type}
    </h6>
    <motion.h1 className="text-[2rem] text-neutral-900 leading-10 mb-4 pb-px font-[550] tracking-tight">
      {props.children}
    </motion.h1>
  </motion.div>
);

const Subheading = ({ id, children, ...props }) => (
  <motion.h2
    className="text-[1.625rem] text-neutral-900 font-[550] leading-8 pt-[3px] pb-px mt-1 mb-4 tracking-tight"
    {...props}
  >
    <div id={id} className="relative top-[-180px]" />
    {children}
  </motion.h2>
);

export default function CaseStudyHeading(props) {
  const Component = props.size == "h1" ? Heading : Subheading;
  return <Component {...props}>{props.text}</Component>;
}
