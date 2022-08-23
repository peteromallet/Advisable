import React from "react";

function BarchartIcon({
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
        fill={fill}
        stroke={stroke}
        strokeLinejoin="round"
        d="M4.862 13.115H1.877a.981.981 0 01-.986-.933c-.05-1.14-.05-2.266.005-3.406a.953.953 0 01.872-.91 13.735 13.735 0 012.27 0c.479.038.849.43.872.91.068 1.45.052 2.878-.048 4.339z"
      ></path>
      <path
        fill={fill}
        stroke={stroke}
        strokeLinejoin="round"
        d="M8.96 13.115H5.04a100.928 100.928 0 01-.029-7.72.947.947 0 01.807-.918 8.396 8.396 0 012.364 0 .947.947 0 01.807.918c.089 2.587.079 5.122-.03 7.72z"
      ></path>
      <path
        fill={fill}
        stroke={stroke}
        strokeLinejoin="round"
        d="M12.049 13.115h-2.96c-.109-2.622-.118-8.119-.027-11.221a.941.941 0 01.805-.917 8.396 8.396 0 012.364 0c.458.062.79.454.804.917.081 2.763.083 7.424.005 10.263a.987.987 0 01-.991.958z"
      ></path>
    </svg>
  );
}

export default BarchartIcon;

