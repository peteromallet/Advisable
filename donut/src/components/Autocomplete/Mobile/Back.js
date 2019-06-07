import React from "react";
import { MobileContainerBack } from "../styles";

const Back = ({ onClick }) => {
  return (
    <MobileContainerBack onClick={onClick}>
      <svg
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 9C0 8.73478 0.105357 8.48043 0.292893 8.29289L8.29289 0.292893C8.68342 -0.097631 9.31658 -0.097631 9.70711 0.292893C10.0976 0.683419 10.0976 1.31658 9.70711 1.70711L2.41421 9L9.70711 16.2929C10.0976 16.6834 10.0976 17.3166 9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L0.292893 9.70711C0.105357 9.51957 0 9.26522 0 9Z"
          fill="#1944DC"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21 10H1V8H21V10Z"
          fill="#1944DC"
        />
      </svg>
    </MobileContainerBack>
  );
};

export default Back;
