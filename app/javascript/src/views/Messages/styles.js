import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 1150px;
  margin: 0 auto;
`;

export const Main = styled.div`
  flex-grow: 1;
`;

export const Sidebar = styled.div`
  width: 300px;
  flex-shrink: 0;
  padding-top: 30px;
  padding-left: 30px;
`;

export const Topbar = styled.div`
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;
