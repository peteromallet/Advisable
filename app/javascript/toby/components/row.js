import React from "react";
import { theme } from "@advisable/donut";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getColumnRenderComponent } from "../attributes";

const StyledRow = styled.div`
  display: flex;
  cursor: default;
  user-select: none;
  border-bottom: 1px solid ${theme.colors.neutral200};

  &:hover {
    background: ${theme.colors.neutral100};
  }
`;

const StyledRowCell = styled.div`
  height: 36px;
  width: ${(p) => p.width || "200px"};
  font-size: 15px;
  padding: 0 16px;
  align-items: center;
  display: inline-flex;
  overflow: hidden;
  white-space: nowrap;
  color: ${theme.colors.neutral800};
  border-right: 1px solid ${theme.colors.neutral200};
`;

export default function Row({ record, resource }) {
  const history = useHistory();
  const params = useParams();

  const handleClick = () => {
    history.push(`/${params.resourceName}/${record.id}`);
  };

  return (
    <StyledRow onClick={handleClick}>
      {resource.columns.map((column) => {
        const Component = getColumnRenderComponent(column);
        return (
          <StyledRowCell key={column.name}>
            <Component record={record} column={column} />
          </StyledRowCell>
        );
      })}
    </StyledRow>
  );
}
