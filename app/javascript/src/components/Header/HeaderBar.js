import React from "react";
import { motion } from "framer-motion";
import composeStyles from "src/utilities/composeStyles";

const headerClasses = composeStyles({
  base: `
    z-20
    flex
    fixed
    top-0
    left-0
    right-0
    bg-white
    shadow
    align-items
    items-center
    h-[var(--header-height)]
  `,
});

export default function HeaderBar({ children, className }) {
  return (
    <>
      <motion.header layoutScroll className={headerClasses({ className })}>
        {children}
      </motion.header>
      <div className="h-[var(--header-height)]" />
    </>
  );
}
