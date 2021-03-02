import React from "react";
import { useParams } from "react-router-dom";
import { theme } from "@advisable/donut";
import styled from "styled-components";
import { useResources, getResource } from "./resources";

const StyledAttributeColumns = styled.div`
  background: white;
  border-top: 1px solid ${theme.colors.neutral200};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledAttributeColumnsCell = styled.div`
  height: 40px;
  width: ${(p) => p.width || "200px"};
  font-size: 15px;
  padding: 0 16px;
  font-weight: 600;
  align-items: center;
  display: inline-flex;
  color: ${theme.colors.neutral800};
  border-right: 1px solid ${theme.colors.neutral200};
`;

export default function TableNavigation() {
  const { resourceName } = useParams();
  const resources = useResources();
  const { columns } = getResource(resources, resourceName);

  return (
    <StyledAttributeColumns>
      {columns.map((column) => (
        <StyledAttributeColumnsCell key={column.name}>
          {column.name}
        </StyledAttributeColumnsCell>
      ))}
    </StyledAttributeColumns>
  );
}
