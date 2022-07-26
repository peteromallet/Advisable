import React from "react";

function TargetIcon({
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
        fill="#fff"
        d="M11.987 22.285c6.577 0 10.277-3.7 10.277-10.276 0-6.577-3.7-10.277-10.277-10.277-6.577 0-10.276 3.7-10.276 10.277 0 6.577 3.7 10.276 10.276 10.276z"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M22.264 12.009c0 6.577-3.7 10.276-10.277 10.276-6.577 0-10.276-3.7-10.276-10.276 0-6.577 3.7-10.277 10.276-10.277"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M10.348 6.836c-2.386.542-3.7 2.346-3.7 5.172 0 3.42 1.924 5.344 5.344 5.344 2.965 0 4.805-1.446 5.242-4.059M11.992 12.008l3.562-3.561"
      ></path>
      <path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M15.553 8.45l-.213-.692a3.429 3.429 0 01.852-3.434l2.608-2.61.822 2.667 2.666.822L19.68 7.81a3.428 3.428 0 01-3.435.852l-.692-.213z"
      ></path>
    </svg>
  );
}

export default TargetIcon;

