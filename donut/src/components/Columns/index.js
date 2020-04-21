import React from "react";
import { StyledColumns, StyledColumn } from "./styles";

const Columns = ({ spacing, align, children, ...props }) => {
  return (
    <StyledColumns align={align} {...props}>
      {React.Children.map(children, (c) => {
        if (c === null) return null;

        if (c.type.displayName === StyledColumn.displayName) {
          return React.cloneElement(c, { spacing });
        }

        return (
          <StyledColumn spacing={spacing}>{React.cloneElement(c)}</StyledColumn>
        );
      })}
    </StyledColumns>
  );
};

Columns.Column = StyledColumn;

export default Columns;
