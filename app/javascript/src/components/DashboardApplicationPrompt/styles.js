import styled from "styled-components";
import { Text } from "@advisable/donut";

export const StyledHeader = styled(Text)`
  background: linear-gradient(90deg, #00199b, #00cbbf);
  letter-spacing: -0.04em;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const StyledDescription = styled(Text)`
  max-width: 540px;
`;
