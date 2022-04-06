import React from "react";
import { motion } from "framer-motion";

const Header = (props) => (
  <div>
    <h6 className="text-sm uppercase font-[550] leading-5">
      <div id={props.id} className="relative top-[-92px]" />
      {props.section.type}
    </h6>
    <motion.h1 className="text-[2rem] font-[550]">
      <div id={props.id} className="relative top-[-92px]" />
      {props.children}
    </motion.h1>
  </div>
);

const Subheader = ({ id, children }) => (
  <motion.h1 className="text-[1.625rem] font-[550]">
    <div id={id} className="relative top-[-92px]" />
    {children}
  </motion.h1>
);

export default function CaseStudyHeading(props) {
  const Component = props.size == "h1" ? Header : Subheader;
  return <Component {...props}>{props.text}</Component>;
}
