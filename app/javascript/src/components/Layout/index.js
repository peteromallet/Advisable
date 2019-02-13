import styled, { css } from "styled-components";
import { breakpoints } from "src/utilities/screenSizes";

let Layout = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  max-width: 1060px;
  padding-top: 40px;
  padding-bottom: 40px;

  ${breakpoints.small(css`
    padding: 0;
  `)};
`;

let Sidebar = styled.div`
  width: 300px;
  flex-shrink: 0;
  margin-right: 50px;
`;

let Main = styled.div`
  width: 100%;
  flex-grow: 1;
`;

Layout.Sidebar = Sidebar;
Layout.Main = Main;

export default Layout;
