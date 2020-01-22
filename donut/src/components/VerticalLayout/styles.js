import styled from "styled-components";
import Div100vh from "react-div-100vh";

export const StyledVerticalLayout = styled(Div100vh)`
  display: flex;
  flex-direction: column;
`;

export const StyledVerticalLayoutHeader = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`;

export const StyledVerticalLayoutContent = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: scroll;
`;

export const StyledVerticalLayoutFooter = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
`;

export default StyledVerticalLayout;
