import React from "react";

function PaintbrushIcon({
  stroke = "rgb(0 0 0)",
  fill = "rgb(0 0 0 / 24)",
  bg = "#fff",
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
        d="M16.136 3.012l-7.288 9.11 3.03 3.03 9.11-7.288a3.452 3.452 0 10-4.852-4.852z"
      ></path>
      <path
        fill={bg}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M3.644 12.477c2.424-2.424 5.455-1.818 7.273 0 1.818 1.818 2.424 4.849 0 7.273-2.424 2.424-5.986 2.698-9.091 1.818 2.386-2.386-.822-6.45 1.818-9.091z"
      ></path>
    </svg>
  );
}

export default PaintbrushIcon;
