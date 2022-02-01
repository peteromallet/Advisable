import React from "react";
import css from "@styled-system/css";
import { Box } from "@advisable/donut";
import { Link } from "react-router-dom";

const Table = ({ children }) => {
  return <Box>{children}</Box>;
};

Table.Header = function TableHeader({ children }) {
  return (
    <Box>
      <Box display="flex">{children}</Box>
      <Box marginTop={4} height="1px" bg="neutral100" />
    </Box>
  );
};

Table.HeaderCell = function TableHeaderCell({ children, ...props }) {
  return (
    <Box fontSize="sm" color="neutral600" {...props}>
      {children}
    </Box>
  );
};

Table.Row = function TableRow({ children, to }) {
  return (
    <Box>
      <Link to={to}>
        <Box
          marginY={1}
          paddingY={3}
          display="flex"
          alignItems="center"
          css={css({
            borderRadius: "12px",
            paddingX: 3,
            marginX: "-12px",
            "&:hover": {
              bg: "neutral50",
            },
          })}
        >
          {children}
        </Box>
      </Link>
      <Box height="1px" bg="neutral100" />
    </Box>
  );
};

Table.Cell = function TableCell({ children, ...props }) {
  return <Box {...props}>{children}</Box>;
};

export default Table;
