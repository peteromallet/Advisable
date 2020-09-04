import styled from "styled-components";
import { compose, width, padding } from "styled-system";

export const StyledView = styled.div`
  display: flex;
  position: relative;
`;

export const StyledViewContent = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: scroll;
`;

export const StyledSidebar = styled.div`
  ${compose(width, padding)};

  z-index: 3;
  background: white;
  height: calc(100vh - 60px);
  box-shadow: 0px 1px 20px rgba(14, 31, 91, 0.04);
`;
