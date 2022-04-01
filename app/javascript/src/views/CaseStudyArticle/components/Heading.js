import React from "react";

const Header = ({ id, children }) => (
  <h1 className="text-[2rem] font-[550]">
    <div id={id} className="relative top-[-92px]" />
    {children}
  </h1>
);

const Subheader = ({ id, children }) => (
  <h1 className="text-[1.625rem] font-[550]">
    <div id={id} className="relative top-[-92px]" />
    {children}
  </h1>
);

export default function CaseStudyHeading({ id, size, text }) {
  const Component = size == "h1" ? Header : Subheader;
  return <Component id={id}>{text}</Component>;
}
