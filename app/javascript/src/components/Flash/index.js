import React from "react";
import { ExclamationCircle } from "@styled-icons/heroicons-outline";
import { Notice } from "@advisable/donut";

export default function Flash({ name, ...props }) {
  if (!window.flash?.[name]) return null;

  return (
    <Notice icon={<ExclamationCircle />} {...props}>
      {window.flash[name]}
    </Notice>
  );
}
