import React, { cloneElement, createElement } from "react";
import composeStyles from "src/utilities/composeStyles";

const classes = composeStyles({
  base: `
    p-4
    flex
    rounded-lg
    items-center
    bg-neutral-100
  `,
  variants: {
    onClick: `cursor-pointer`,
  },
});

export default function MessageCTA({ icon, title, subText, action, ...props }) {
  return (
    <div className={classes({ onClick: props.onClick })} {...props}>
      {icon && (
        <div className="w-10 h-10 border border-solid border-neutral-300 rounded-full grid place-items-center">
          {createElement(icon, { className: "w-5 h-5 text-neutral-700" })}
        </div>
      )}
      <div className="pl-3 flex-1">
        <p className="font-medium leading-none mb-1">{title}</p>
        <p className="text-neutral700 leading-none text-sm">{subText}</p>
      </div>
      {action && cloneElement(action)}
    </div>
  );
}
