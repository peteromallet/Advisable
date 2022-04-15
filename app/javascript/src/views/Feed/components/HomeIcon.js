import React from "react";

function HomeIcon({
  primaryColor = "var(--color-blue900)",
  secondaryColor = "var(--color-neutral400)",
  width = "20",
  ...props
}) {
  return (
    <svg fill="none" viewBox="0 0 20 20" width={width} {...props}>
      <path
        fill={primaryColor}
        fillRule="evenodd"
        d="M9.35 2.24a1 1 0 011.3 0l7 6A1 1 0 0117 10v5a3 3 0 01-3 3H6a3 3 0 01-3-3v-5a1 1 0 01-.65-1.76l1-.856 6-5.143zM5 8.604V15a1 1 0 001 1h8a1 1 0 001-1V8.603l-5-4.286-5 4.286z"
        clipRule="evenodd"
      ></path>
      <path
        fill={secondaryColor}
        d="M7.5 13.5a2.5 2.5 0 015 0V16h-5v-2.5z"
      ></path>
    </svg>
  );
}

export default HomeIcon;
