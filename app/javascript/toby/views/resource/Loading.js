import React from "react";
import { Skeleton } from "@advisable/donut";
import { StyledRow, StyledCell } from "../../styles";

export default function Loading({ resource, sizeForColumn }) {
  const cells = resource.attributes.map((attr) => (
    <StyledCell key={attr.name} style={{ width: sizeForColumn(attr.name) }}>
      <Skeleton width={120} height={20} />
    </StyledCell>
  ));

  return (
    <>
      <StyledRow>{cells}</StyledRow>
      <StyledRow>{cells}</StyledRow>
      <StyledRow>{cells}</StyledRow>
      <StyledRow>{cells}</StyledRow>
      <StyledRow>{cells}</StyledRow>
    </>
  );
}
