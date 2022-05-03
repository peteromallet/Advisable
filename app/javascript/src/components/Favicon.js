import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useImage } from "react-image";
import composeStyles from "src/utilities/composeStyles";
import LogoMark from "./LogoMark";

const faviconStyles = composeStyles({
  base: `
    grid
    bg-white
    place-items-center
    overflow-hidden
  `,
  variants: {
    size: {
      sm: `
        w-[28px]
        h-[28px]
        rounded-[6px]
      `,
      md: `
        w-[40px]
        h-[40px]
        rounded-[8px]
      `,
    },
  },
});

const imgClasses = composeStyles({
  base: `
    max-h-full
    max-w-full
  `,
});

function FaviconImg({ src: url, ...props }) {
  const { src } = useImage({ srcList: url });
  return <img src={src} {...props} />;
}

function FaviconFallback() {
  return <LogoMark color="subtle" size="20" />;
}

function Favicon({ src, size, className }) {
  return (
    <div className={faviconStyles({ size, className })}>
      {src ? (
        <Suspense fallback={<FaviconFallback />}>
          <ErrorBoundary fallback={<FaviconFallback />}>
            <FaviconImg src={src} className={imgClasses()} />
          </ErrorBoundary>
        </Suspense>
      ) : (
        <FaviconFallback />
      )}
    </div>
  );
}

Favicon.defaultProps = {
  size: "md",
};

export default Favicon;
