import React from "react";
import { Box } from "@advisable/donut";

function Masonry({ children, columns = 2, gutter = 20 }) {
  // Filter null children
  const validChildren = [];
  React.Children.forEach(children, (child) => {
    child && validChildren.push(React.cloneElement(child));
  });

  const cols = [];
  for (let n = 0; n < columns; n++) {
    cols.push([]);
  }

  validChildren.forEach((child, i) => {
    const col = i % columns;
    cols[col].push(child);
  });

  const spacing = gutter / 2;

  return (
    <Box display="flex" mx={`-${spacing}px`} mt={`-${spacing}px`}>
      {cols.map((col, i) => (
        <Box width="100%" key={i}>
          {col.map((el, i) => (
            <Box key={i} p={`${spacing}px`}>
              {el}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default Masonry;
