import styled from "styled-components";
import { theme } from "@advisable/donut";

export const Container = styled.div`
  display: flex;
`;

export const Main = styled.div`
  width: 100%;
  flex-shrink: 1;
`;

export const Sidebar = styled.div`
  width: 40%;
  flex-shrink: 0;
  min-height: 100vh;
  background: ${theme.colors.neutral[0]};
`;

export const Content = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 580px;
`;
