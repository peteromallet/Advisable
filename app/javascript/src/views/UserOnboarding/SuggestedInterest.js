import { PlusSm } from "@styled-icons/heroicons-solid";
import React from "react";
import composeStyles from "src/utilities/composeStyles";

const styles = composeStyles({
  base: `
    rounded-full
    py-1
    px-4
    border-solid
    inline-flex
    border-2
    cursor-pointer
    border-neutral-300
    hover:border-neutral-400
    items-center
    gap-1
  `,
});

export default function SuggestedInterest({ children, ...props }) {
  return (
    <button className={styles()} {...props}>
      <PlusSm className="w-4 h-4" />
      {children}
    </button>
  );
}
