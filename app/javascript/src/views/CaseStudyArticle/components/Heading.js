import React, { createElement } from "react";

const H1 = ({ block, ...props }) => (
  <h1
    className="mt-6 mb-6 text-3xl tracking-tight leading-tight text-neutral-900 font-[550]"
    {...props}
  >
    {block.text}
  </h1>
);

const H2 = ({ block, ...props }) => (
  <h2
    className="block mt-8 mb-6 text-2xl tracking-tight leading-tight heading text-neutral-900 font-[550]"
    {...props}
  >
    {block.text}
  </h2>
);

const SIZES = {
  h1: H1,
  h2: H2,
};

export default function CaseStudyHeading({ block, ...props }) {
  const component = SIZES[block.size] || SIZES.h2;
  return createElement(component, { block, ...props });
}
