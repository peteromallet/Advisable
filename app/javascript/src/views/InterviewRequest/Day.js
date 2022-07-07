import { ChevronRight } from "@styled-icons/heroicons-solid";
import React from "react";

const className = `
  p-4
  flex
  w-full
  text-left
  rounded-md
  items-center
  justify-between
  cursor-pointer
  border-2 border-solid border-neutral-200 hover:border-neutral-400
`;

export default function Day({ title, subText, ...props }) {
  return (
    <button className={className} {...props}>
      <div>
        <p className="font-medium text-neutral900">{title}</p>
        <p className="text-neutral600">{subText}</p>
      </div>
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}
