import React from "react";

// eslint-disable-next-line react/display-name
const asIcon = ({ drawn }) => ({ size, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d={drawn} />
  </svg>
);

export const Add = asIcon({
  drawn: "M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z",
});

export const Filter = asIcon({
  drawn: "M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z",
});
