import React from "react";

// Renders an error message for a given field from formik context.
export default function ErrorMessage({ name, ...props }) {
  return <div {...props}>ErrorMessage</div>;
}
