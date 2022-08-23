import React from "react";

function CoinsIcon({
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
        d="M1.959 13.375c-.13-1.559-.248-3.165-.248-4.807 0-1.268.07-2.895.163-4.116h9.289v12.124c-1.046.154-2.12.284-3.214.284a17.42 17.42 0 01-1.83-.105 31.67 31.67 0 01-1.124-.142c-1.63-.231-2.9-1.597-3.036-3.238z"
      ></path>
      <path
        fill={bg}
        d="M7.949 7.75c3.912 0 6.113-1.086 6.113-3.018 0-.46-.126-.873-.37-1.235-.778-1.153-2.765-1.783-5.743-1.783-3.912 0-6.113 1.087-6.113 3.018 0 1.537 1.393 2.54 3.934 2.885.652.088 1.38.133 2.179.133z"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M1.874 4.452a60.344 60.344 0 00-.163 4.116c0 1.642.118 3.248.248 4.807.136 1.641 1.405 3.007 3.036 3.238.305.044.613.084.923.12"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeWidth="1.714"
        d="M5.43 12.348c-1.963-.151-3.541-1.342-3.72-2.791"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M5.77 7.617C3.23 7.27 1.836 6.269 1.836 4.732c0-1.931 2.2-3.018 6.113-3.018 2.978 0 4.965.63 5.743 1.783"
      ></path>
      <path
        fill={fill}
        stroke={stroke}
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M13.01 22.04c.965.136 1.951.246 2.955.246s1.99-.11 2.954-.247c1.63-.231 2.9-1.597 3.037-3.238.129-1.56.247-3.165.247-4.807 0-1.4-.086-2.775-.192-4.117H9.89a60.35 60.35 0 00-.162 4.117c0 1.642.118 3.248.248 4.807.136 1.64 1.405 3.007 3.036 3.238z"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeWidth="1.714"
        d="M22.203 14.982c-.177 1.45-1.756 2.64-3.72 2.792-.825.063-1.665.11-2.518.11-.853 0-1.693-.047-2.518-.11-1.964-.151-3.543-1.342-3.72-2.792"
      ></path>
      <path
        fill={bg}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M15.964 13.176c3.913 0 6.113-1.086 6.113-3.018 0-1.931-2.2-3.018-6.113-3.018-3.912 0-6.112 1.087-6.112 3.018 0 1.932 2.2 3.018 6.112 3.018z"
      ></path>
    </svg>
  );
}

export default CoinsIcon;
