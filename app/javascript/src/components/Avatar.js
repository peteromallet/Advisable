import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useImage } from "react-image";
import composeStyles from "src/utilities/composeStyles";
import possessive from "src/utilities/possesive";

const avatarStyles = composeStyles({
  base: `
    grid
    font-medium
    rounded-full
    place-items-center
    bg-neutral200
    text-neutral500
    overflow-hidden
  `,
  variants: {
    size: {
      xs: `
        w-[28px]
        h-[28px]
        text-xs
      `,
      sm: `
        w-[36px]
        h-[36px]
        text-xs
      `,
      md: `
        w-[40px]
        h-[40px]
        text-sm
      `,
      lg: `
        w-[52px]
        h-[52px]
        text-base
      `,
      xl: `
        w-[60px]
        h-[60px]
        text-lg
      `,
      "2xl": `
        w-[80px]
        h-[80px]
        text-xl
      `,
      "3xl": `
        w-[96px]
        h-[96px]
        text-xl
      `,
    },
  },
});

const imgClasses = composeStyles({
  base: `
    w-full
    h-full
    object-cover
  `,
});

function AvatarImg({ src: url, ...props }) {
  const { src } = useImage({ srcList: url });
  return <img src={src} {...props} />;
}

function Initials({ name = "" }) {
  const firstChars = name.split(" ").map((word) => word[0].toUpperCase());
  return firstChars.slice(0, 2).join("");
}

function Avatar({ src, name, size, className }) {
  return (
    <div className={avatarStyles({ size, className })}>
      {src ? (
        <Suspense fallback={<Initials name={name} />}>
          <ErrorBoundary fallback={<Initials name={name} />}>
            <AvatarImg
              src={src}
              className={imgClasses()}
              alt={`${possessive(name)} avatar`}
            />
          </ErrorBoundary>
        </Suspense>
      ) : (
        <Initials name={name} />
      )}
    </div>
  );
}

Avatar.defaultProps = {
  size: "md",
};

export default Avatar;
