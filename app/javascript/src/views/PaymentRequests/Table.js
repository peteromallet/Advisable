import React from "react";
import css from "@styled-system/css";
import { Box } from "@advisable/donut";
import { Link } from "react-router-dom";

const Table = ({ children }) => {
  return children;
};

Table.Header = function TableHeader({ children }) {
  return (
    <div className="w-full">
      <div className="flex">{children}</div>
      <div className="mt-4 border-b border-solid border-neutral100" />
    </div>
  );
};

Table.HeaderCell = function TableHeaderCell({ children, className, ...props }) {
  const classes = `text-sm text-neutral600 ${className}`;
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Table.Row = function TableRow({ children, to }) {
  return (
    <div>
      <Link to={to}>
        <div className="my-1 py-3 flex items-center px-3 -mx-3 rounded-sm hover:bg-neutral50">
          {children}
        </div>
      </Link>
      <div className="border-b border-solid border-neutral100" />
    </div>
  );
};

Table.Cell = function TableCell({ children, ...props }) {
  return <div {...props}>{children}</div>;
};

export default Table;
