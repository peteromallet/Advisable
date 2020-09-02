import styled, { css } from "styled-components";
import { padding } from "styled-system";

const styledSidebar_HasSidebar = css`
  padding-left: 280px;
`;

export const StyledView = styled.div`
  position: relative;
  ${(p) => p.$hasSidebar && styledSidebar_HasSidebar}
`;

export const StyledViewContent = styled.div``;

export const StyledSidebar = styled.div`
  ${padding};

  left: 0;
  top: 60px;
  z-index: 3;
  width: 280px;
  position: fixed;
  background: white;
  height: calc(100vh - 60px);
  box-shadow: 0px 1px 20px rgba(14, 31, 91, 0.04);
`;
