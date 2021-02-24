import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
    >
      <mask
        id="mask0"
        width="40"
        height="40"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <circle cx="20" cy="20" r="20" fill="#fff"></circle>
      </mask>
      <g mask="url(#mask0)">
        <path fill="#fff" d="M0 0H40V40H0z"></path>
        <circle cx="20" cy="16" r="7" fill="#B9D4DC"></circle>
        <ellipse cx="20" cy="38.5" fill="#B9D4DC" rx="19" ry="14"></ellipse>
      </g>
    </svg>
  );
}

export default Icon;
