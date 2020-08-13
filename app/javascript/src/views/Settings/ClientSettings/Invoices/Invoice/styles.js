import styled from "styled-components";

export const StyledTable = styled.table`
  margin-left: -24px;
  margin-bottom: 26px;
  width: calc(100% + 24px + 24px);
  & th {
    vertical-align: middle;
    padding: 16px 24px;
  }
  & thead th {
    padding: 8px 24px 16px;
  }
`;

export const StyledTitle = styled.tr`
  position: relative;
  border-top: 1px solid #ececee;
  border-bottom: 1px solid #ececee;
`;
