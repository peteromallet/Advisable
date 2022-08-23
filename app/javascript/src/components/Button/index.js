import React, { cloneElement } from "react";
import composeStyles from "src/utilities/composeStyles";

export const buttonStyles = composeStyles({
  base: `
    inline-flex
    relative
    items-center
    justify-center
    rounded-full
    font-medium
  `,
  variants: {
    variant: {
      primary: `
        text-white
        bg-blue500
        bg-gradient-to-br
        from-blue500
        to-purple500
        hover:from-blue600
        hover:to-purple600
        active:from-blue700
        active:to-purple700
      `,
      secondary: `
        text-white
        bg-neutral900
        hover:bg-neutral800 
        active:bg-neutral700
        disabled:bg-neutral900
      `,
      outlined: `
        border-2
        text-neutral900
        border-neutral800
        hover:!border-blue600
        active:!border-blue800
      `,
      whiteOutlined: `
        border-2
        text-white
        border-[rgba(255,255,255,0.2)]
        hover:!border-[rgba(255,255,255,0.3)]
        active:!border-[rgba(255,255,255,0.4)]
      `,
      subtle: `
        text-blue700
        bg-blue50
        hover:text-blue900
        hover:bg-blue100
        active:text-blue900
        active:bg-blue100
        disabled:bg-blue100
        disabled:text-blue700
      `,
    },
    size: {
      sm: `h-8 px-4 text-md`,
      md: `h-10 px-5 text-md`,
      lg: `h-12 px-6 text-lg`,
    },
    disabled: `opacity-40`,
    loading: `!cursor-default !text-transparent`,
  },
});

export const buttonPrefixStyles = composeStyles({
  base: ``,
  variants: {
    size: {
      sm: `w-4 h-4 mr-1.5`,
      md: `w-5 h-5 mr-2`,
      lg: `w-6 h-6 mr-3`,
    },
  },
});

export const buttonSuffixStyles = composeStyles({
  base: ``,
  variants: {
    size: {
      sm: `w-4 h-4 ml-1.5`,
      md: `w-5 h-5 ml-2`,
      lg: `w-6 h-6 ml-3`,
    },
  },
});

export const loadingStyles = composeStyles({
  base: `
    w-5
    h-5
    rounded-full
    border-2
    border-solid
    border-white
    !border-r-transparent
    animate-spin
  `,
  variants: {
    variant: {
      outlined: `!border-neutral900`,
    },
  },
});

function Button({
  className,
  size,
  variant,
  prefix,
  suffix,
  children,
  loading,
  disabled,
  ...props
}) {
  return (
    <button
      disabled={loading || disabled}
      className={buttonStyles({ className, size, variant, loading, disabled })}
      {...props}
    >
      {loading && (
        <div className="inset-0 absolute grid place-items-center">
          <div className={loadingStyles({ variant })} />
        </div>
      )}
      {prefix &&
        cloneElement(prefix, { className: buttonPrefixStyles({ size }) })}
      {children}
      {suffix &&
        cloneElement(suffix, { className: buttonSuffixStyles({ size }) })}
    </button>
  );
}

Button.defaultProps = {
  size: "md",
  variant: "primary",
};

export default Button;
