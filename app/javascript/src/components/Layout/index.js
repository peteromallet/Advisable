import styled, { css } from "styled-components";
import { breakpoints } from "src/utilities/screenSizes";

let Layout = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  max-width: 1240px;
  padding: 40px 20px;

  ${breakpoints.small(css`
    padding: 0;
  `)};

  @media (max-width: 900px) {
    padding: 20px;
    flex-direction: column;
  }
`;

const sidebarWidths = {
  s: "220px",
  m: "280px",
};

let Sidebar = styled.div`
  flex-shrink: 0;
  margin-right: 50px;
  width: ${(props) => sidebarWidths[props.size || "m"]};

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const mainWidths = {
  s: "calc(100% - 270px)",
  m: "calc(100% - 330px)",
};

let Main = styled.div`
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: ${(props) => mainWidths[props.size || "m"]};
  flex-grow: 1;
  flex-shrink: 1;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

Layout.Sidebar = Sidebar;
Layout.Main = Main;

export default Layout;
