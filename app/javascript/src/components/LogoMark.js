import React from "react";

const COLORS = {
  blue: "#0C3FEC",
  dark: "#041651",
  white: "white",
  subtle: "#CCCCD1",
};

function LogoMark({ size = "20", color = "blue" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        fill={COLORS[color] || COLORS["blue"]}
        d="M17.727 21.794a12.045 12.045 0 015.853-4.954c1.368-.542 2.859-.84 4.42-.84 6.627 0 12 5.373 12 12s-5.373 12-12 12a11.986 11.986 0 01-9.834-5.122c-.662-.943-.145-2.183.852-2.761a14.062 14.062 0 003.192-2.538A6 6 0 1028 22c-2 0-3.625.733-5.727 4.206A11.993 11.993 0 0112 32C5.373 32 0 26.627 0 20S5.373 8 12 8c4.069 0 7.664 2.025 9.834 5.122.661.943.144 2.183-.852 2.761a14.061 14.061 0 00-3.192 2.538A6 6 0 1012 26c3.314-.001 4.378-1.978 5.727-4.207zM33.2 14.997a6 6 0 10-10.989-4.576 14.061 14.061 0 00-3.193-2.538c-.996-.578-1.513-1.818-.852-2.761A11.986 11.986 0 0128 0c6.627 0 12 5.373 12 12 0 1.426-.248 2.793-.705 4.062-.442 1.23-2.005 1.383-3.062.614a13.97 13.97 0 00-3.034-1.679z"
      ></path>
    </svg>
  );
}

export default LogoMark;
