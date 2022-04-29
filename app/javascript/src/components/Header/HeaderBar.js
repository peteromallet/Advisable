import React from "react";
import composeStyles from "src/utilities/composeStyles";

const headerClasses = composeStyles({
  base: `
    z-20
    px-5
    flex
    fixed
    top-0
    left-0
    right-0
    bg-white
    shadow
    align-items
    h-[var(--header-height)]
  `,
});

export default function HeaderBar({ children, className }) {
  return (
    <>
      <header className={headerClasses({ className })}>{children}</header>
      <div className="h-[var(--header-height)]" />
    </>
  );
}
