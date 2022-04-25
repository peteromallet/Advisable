import React from "react";

function BookmarkIcon({
  primaryColor = "var(--color-blue900)",
  width = "20",
  ...props
}) {
  return (
    <svg fill="none" viewBox="0 0 20 20" width={width} {...props}>
      <path
        stroke={primaryColor}
        strokeWidth="2"
        d="M9.553 14.606L6 16.382V4a1 1 0 011-1h6a1 1 0 011 1v12.382l-3.553-1.776-.447-.224-.447.224z"
      ></path>
    </svg>
  );
}

export default BookmarkIcon;
