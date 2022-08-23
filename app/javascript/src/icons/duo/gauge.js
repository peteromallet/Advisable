import React from "react";

function GaugeIcon({
  stroke = "rgb(0 0 0)",
  fill = "rgb(0 0 0 / 24)",
  bg = "white",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <circle cx="7" cy="7" r="6.25" fill={bg} stroke={stroke}></circle>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 5L7 9.188"
      ></path>
      <path
        fill={fill}
        stroke={stroke}
        strokeLinejoin="round"
        d="M12.857 9.188a6.252 6.252 0 01-11.714 0h11.713z"
      ></path>
    </svg>
  );
}

export default GaugeIcon;
