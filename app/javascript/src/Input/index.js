import React, { forwardRef, useState } from "react";
import composeStyles from "src/utilities/composeStyles";

export const inputStyles = composeStyles({
  base: `
    flex
    w-full
    gap-2
    border-2
    bg-neutral100
    border-solid
    border-transparent
    rounded-sm
  `,
  variants: {
    size: {
      md: `h-12 px-4`,
    },
    rounded: `!rounded-full`,
    error: `error-border`,
    disabled: `opacity-50`,
    focused: `
      bg-neutral200
      !border-neutral900
    `,
  },
});

export const inputControlStyles = composeStyles({
  base: `
    w-full
    h-full
    px-0
    focus:shadow-none
    border-none
    outline-none
    bg-transparent
  `,
});

export const inputDecorationStyles = composeStyles({
  base: `
    grid
    place-items-center
  `,
});

const Input = forwardRef(function Input(
  {
    size,
    error,
    prefix,
    suffix,
    className,
    onFocus,
    onBlur,
    disabled,
    rounded,
    ...props
  },
  ref,
) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
    onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur(e);
  };

  return (
    <div
      className={inputStyles({
        error,
        size,
        focused,
        disabled,
        className,
        rounded,
      })}
    >
      {prefix && <div className={inputDecorationStyles()}>{prefix}</div>}
      <input
        ref={ref}
        disabled={disabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={inputControlStyles()}
        {...props}
      />
      {suffix && <div className={inputDecorationStyles()}>{suffix}</div>}
    </div>
  );
});

Input.defaultProps = {
  size: "md",
  onBlur() {},
  onFocus() {},
};

export default Input;
