import React from "react";

function LightbulbIcon({
  stroke = "rgb(0 0 0)",
  fill = "rgb(0 0 0 / 24)",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.58 2.58l.369.369M7 .75v.52M13.25 7h-.52M1.27 7H.75M11.42 2.58l-.369.369"
      ></path>
      <path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.896 5.528a3.348 3.348 0 01-.055 3.454c-.11.176-.213.33-.307.47-.34.51-.574.86-.64 1.486H5.107c-.065-.646-.301-.997-.67-1.543-.075-.11-.156-.23-.24-.36a3.347 3.347 0 115.699-3.507z"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.156 13.25H5.844"
      ></path>
    </svg>
  );
}

export default LightbulbIcon;

