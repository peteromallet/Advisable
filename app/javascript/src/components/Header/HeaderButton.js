import React, { createElement, forwardRef } from "react";
import composeStyles from "src/utilities/composeStyles";

const classes = composeStyles({
  base: `
    w-[40px]
    h-[40px]
    rounded-full
    relative

    flex
    items-center
    justify-center
    border
    border-solid
    border-neutral200
    text-neutral600


    hover:text-neutral900
    hover:border-neutral300
    hover:ring-1
    hover:ring-neutral300
  `,
});

const promptClasses = composeStyles({
  base: `
    -top-2
    -right-2
    absolute
    px-2
    h-[20px]
    bg-blue500
    text-white
    flex
    items-center
    justify-center
    text-[11px]
    font-medium
    rounded-full
  `,
});

function HeaderButtonBadge(props) {
  return (
    <div
      {...props}
      className={promptClasses()}
      data-testid="unreadNotifications"
    />
  );
}

function HeaderButton({ icon, count, prompt, className, ...props }, ref) {
  return (
    <button ref={ref} className={classes({ className })} {...props}>
      {count ? <HeaderButtonBadge>{count}</HeaderButtonBadge> : null}
      {prompt && <HeaderButtonBadge />}
      {createElement(icon, { className: "w-5 h-5" })}
    </button>
  );
}

export default forwardRef(HeaderButton);
