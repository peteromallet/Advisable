import React from "react";

function SliderIcon({
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
        d="M1.645 17.603c.265 2.47 2.251 4.456 4.72 4.731 1.833.205 3.716.38 5.635.38 1.92 0 3.802-.175 5.635-.38 2.469-.275 4.455-2.261 4.72-4.73.194-1.824.36-3.696.36-5.604s-.166-3.78-.36-5.603c-.265-2.47-2.251-4.456-4.72-4.731-1.833-.205-3.716-.38-5.635-.38-1.92 0-3.802.175-5.635.38-2.469.275-4.455 2.261-4.72 4.73-.195 1.824-.36 3.696-.36 5.604s.165 3.78.36 5.603z"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M6.857 7.714H12M17.143 16.286H12"
      ></path>
      <path
        fill="#fff"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M14.571 10.286a2.571 2.571 0 100-5.143 2.571 2.571 0 000 5.143zM9.429 18.857a2.571 2.571 0 110-5.143 2.571 2.571 0 010 5.143z"
      ></path>
    </svg>
  );
}

export default SliderIcon;

