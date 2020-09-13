import React from "react";
import { Box } from "@advisable/donut";

function Star({ filled }) {
  return (
    <Box
      mr="2px"
      color="orange400"
      display="inline-block"
      opacity={filled ? 1 : 0.4}
    >
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path
          fill="currentColor"
          d="M8.53 1.278a.5.5 0 01.94 0l1.884 5.131a.5.5 0 00.46.328l5.682.11a.5.5 0 01.281.906l-4.481 3.215a.5.5 0 00-.185.559l1.638 5.125a.5.5 0 01-.751.57l-4.723-3.11a.5.5 0 00-.55 0l-4.723 3.11a.5.5 0 01-.751-.57l1.638-5.126a.5.5 0 00-.185-.558L.223 7.753a.5.5 0 01.281-.907l5.682-.11a.5.5 0 00.46-.327L8.53 1.278z"
        ></path>
      </svg>
    </Box>
  );
}

export default Star;
