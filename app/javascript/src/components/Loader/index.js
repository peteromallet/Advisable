// Like components/Loading but without any spacing.
import React from "react";
import { StyledLoader } from "./styles";

export default function Loader({ size = "md", color = "neutral500" }) {
  return (
    <StyledLoader color={color} size={size}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32"
      >
        <path
          strokeWidth="2"
          stroke="currentColor"
          strokeLinecap="round"
          d="M31 16c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C1 7.716 7.716 1 16 1"
        ></path>
      </svg>
    </StyledLoader>
  );
}
