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
        d="M11.999 4.456C6.822-1.895 1.356 2.618 1.284 7.483 1.284 14.726 9.95 20.67 12 20.67c2.048 0 10.714-5.944 10.714-13.187-.072-4.865-5.538-9.378-10.714-3.027z"
      ></path>
    </svg>
  );
}

export default HeartIcon;

