import React from "react";
import isArray from "lodash/isArray";
import styled from "styled-components";

const FieldRowField = styled.div`
  flex: 1 1 200px;
  min-width: 200px;
  margin-left: 20px;
  margin-bottom: 25px;
`;

const FieldRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -20px;

  &:last-child ${FieldRowField} { margin-bottom: 0 }
`;

export default ({ children }) => {
  let fields;

  if (isArray(children)) {
    fields = children.map((child, i) => {
      if (child) {
        return <FieldRowField key={i}>{child}</FieldRowField>;
      }
    });
  } else {
    fields = <FieldRowField>{children}</FieldRowField>;
  }

  return <FieldRow>{fields}</FieldRow>;
};
