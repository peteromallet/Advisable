import React from "react";
import { forwardClassName } from "src/utilities/forwardClassName";

export default function ModalHeading({ className, ...props }) {
  return (
    <h3
      className={forwardClassName(
        "text-2xl font-semibold tracking-tight leading-none mb-2 text-center",
        className,
      )}
      {...props}
    />
  );
}
