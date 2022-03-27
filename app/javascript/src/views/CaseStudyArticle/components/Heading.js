import React from "react";

const Header = ({ children }) => (
  <h1 className="text-[2rem] font-[550]">{children}</h1>
);

const Subheader = ({ children }) => (
  <h1 className="text-[1.625rem] font-[550]">{children}</h1>
);

export default function CaseStudyHeading({ size, text }) {
  const Component = size == "h1" ? Header : Subheader;
  return <Component>{text}</Component>;
}
