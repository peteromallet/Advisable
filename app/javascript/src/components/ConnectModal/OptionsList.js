import React, { createElement } from "react";
import { ChevronRight } from "@styled-icons/heroicons-solid";

const optionClasses = `
  p-4
  flex gap-4 items-center
  border-2 border-solid border-neutral100 hover:border-blue600
  rounded-lg
  cursor-pointer
`;

function OptionsList({ children }) {
  return <div className="space-y-2">{children}</div>;
}

export function OptionsListOption({ icon, title, children, ...props }) {
  return (
    <div {...props} role="button" aria-label={title} className={optionClasses}>
      {icon && (
        <div className="w-10 h-10 bg-blue100 rounded-full grid place-items-center text-blue500">
          {createElement(icon, { className: "w-5 h-5" })}
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-lg mb-1 font-medium leading-none">{title}</h3>
        <p className="text-neutral700 leading-snug">{children}</p>
      </div>
      <div className="flex-shrink-0">
        <ChevronRight className="w-5 h-5 text-neutral500" />
      </div>
    </div>
  );
}

export default OptionsList;
