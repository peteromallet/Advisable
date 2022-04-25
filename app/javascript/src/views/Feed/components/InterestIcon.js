import React from "react";

function HomeIcon({
  primaryColor = "var(--color-blue900)",
  width = "20",
  ...props
}) {
  return (
    <svg fill="none" viewBox="0 0 20 20" width={width} {...props}>
      <path
        fill={primaryColor}
        d="M4 8a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM4 12a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
      ></path>
      <path
        fill={primaryColor}
        d="M8 16a1 1 0 01-1-1V5a1 1 0 012 0v10a1 1 0 01-1 1zM12 16a1 1 0 01-1-1V5a1 1 0 112 0v10a1 1 0 01-1 1z"
      ></path>
    </svg>
  );
}

export default HomeIcon;
