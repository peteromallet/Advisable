import React from "react";

function RocketIcon({
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
        d="M10.286 6.857c-2.962-.875-6.857 0-8.823 3.769l4.868 2.69"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M10.286 6.857c-2.962-.875-6.857 0-8.823 3.769l4.868 2.69"
      ></path>
      <path
        fill={fill}
        d="M17.143 13.714c.874 2.963 0 6.857-3.763 8.829l-2.69-4.867"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M17.143 13.714c.874 2.963 0 6.857-3.763 8.829l-2.69-4.867"
      ></path>
      <path
        fill={bg}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M6.33 13.3l.042.026A13.21 13.21 0 0110.7 17.67c3.495-2.094 7.468-4.122 9.281-6.002C23.905 7.745 21.63 2.37 21.63 2.37S16.255.095 12.332 4.02c-1.88 1.813-3.924 5.803-6.001 9.282z"
      ></path>
      <path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M5.329 21.652c-.385.372-1.404.725-2.372.994a1.29 1.29 0 01-1.603-1.603c.269-.968.622-1.986.994-2.372a2.107 2.107 0 013.034-.053 2.109 2.109 0 01-.053 3.034z"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M16.411 7.589l.606-.607"
      ></path>
    </svg>
  );
}

export default RocketIcon;
