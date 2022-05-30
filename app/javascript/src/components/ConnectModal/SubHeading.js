import React from "react";
import { forwardClassName } from "src/utilities/forwardClassName";

export default function SubHeading({ className, ...props }) {
  return (
    <p
      className={forwardClassName(
        "text-center mb-8 max-w-[400px] mx-auto",
        className,
      )}
      {...props}
    />
  );
}
