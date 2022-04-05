import { Check, PlusSm } from "@styled-icons/heroicons-solid";
import React from "react";
import composeStyles from "src/utilities/composeStyles";

const styles = composeStyles({
  base: `
    rounded-full
    py-1
    px-4
    border-solid
    inline-flex
    border
    cursor-pointer
    border-neutral-300
    hover:border-indigo-500
    items-center
    gap-1
  `,
  variants: {
    isSelected: `border-indigo-600 text-indigo-600`,
  },
});

const checkStyles = composeStyles({
  base: `absolute left-0 top-0 w-4 h-4 text-indigo-500 transition opacity-0 scale-0`,
  variants: {
    isSelected: `opacity-100 scale-100`,
  },
});

const plusStyles = composeStyles({
  base: `absolute text-neutral700 left-0 top-0 w-4 h-4 transition opacity-100 scale-100`,
  variants: {
    isSelected: `!opacity-0 !scale-0`,
  },
});

export default function SuggestedInterest({ children, isSelected, ...props }) {
  return (
    <button className={styles({ isSelected })} {...props}>
      <div className="relative w-4 h-4">
        <Check className={checkStyles({ isSelected })} />
        <PlusSm className={plusStyles({ isSelected })} />
      </div>
      {children}
    </button>
  );
}
