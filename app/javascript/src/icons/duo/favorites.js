import React from "react";

function HeartIcon({
  stroke = "rgb(0 0 0)",
  fill = "rgb(0 0 0 / 24)",
  ...props
}) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M9.999 4.547C5.685-.746 1.13 3.015 1.07 7.069c0 6.036 7.222 10.99 8.929 10.99 1.707 0 8.928-4.954 8.928-10.99-.06-4.054-4.614-7.815-8.928-2.522z"
      ></path>
    </svg>
  );
}

export default HeartIcon;
