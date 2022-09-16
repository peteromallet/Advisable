import React, { createElement, forwardRef } from "react";
import { Link } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";

const classNames = composeStyles({
  base: `
    flex
    group
    w-full
    items-center
    cursor-pointer
    font-inter
    outline-none
    text-left text-[15px] text-neutral-700 hover:text-blue600
    py-3
  `,
});

const iconClasses = composeStyles({
  base: `
    w-7 h-7
    rounded-full
    grid place-items-center
  `,
  variants: {
    variant: {
      neutral: `bg-neutral-200 text-neutral-800 group-hover:bg-neutral-300`,
      blue: `bg-blue-100 text-blue-900 group-hover:bg-blue-200`,
    },
  },
});

const ConversationAction = forwardRef(function ConversationAction(
  { icon, children, className, variant = "neutral", ...props },
  ref,
) {
  return (
    <button ref={ref} className={classNames({ className })} {...props}>
      <div className={iconClasses({ variant })}>
        {createElement(icon, { className: "w-4 h-4" })}
      </div>
      <span className="flex-1 pl-2 font-medium">{children}</span>
    </button>
  );
});

export function ConversationActionLink({
  icon,
  children,
  className,
  variant = "neutral",
  ...props
}) {
  return (
    <Link className={classNames({ className })} {...props}>
      <div className={iconClasses({ variant })}>
        {createElement(icon, { className: "w-4 h-4" })}
      </div>
      <span className="flex-1 pl-2 font-medium">{children}</span>
    </Link>
  );
}

export default ConversationAction;
