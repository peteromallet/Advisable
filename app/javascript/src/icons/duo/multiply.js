import React from "react";

function MultiplyIcon({
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
        strokeWidth="1.714"
        d="M1.649 17.603c.264 2.47 2.25 4.456 4.719 4.731 3.791.423 7.48.423 11.27 0 2.47-.275 4.456-2.261 4.72-4.73.195-1.824.36-3.696.36-5.604s-.165-3.78-.36-5.603c-.264-2.47-2.25-4.456-4.72-4.731a50.253 50.253 0 00-11.27 0c-2.469.275-4.455 2.261-4.72 4.73C1.455 8.22 1.29 10.093 1.29 12s.165 3.78.36 5.603z"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeWidth="1.714"
        d="M15.03 8.97l-6.061 6.06M15.03 15.03L8.969 8.97"
      ></path>
    </svg>
  );
}

export default MultiplyIcon;

