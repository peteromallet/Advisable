import styled from "styled-components";
import { Text } from "@advisable/donut";

export const StyledLineClamp = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => lines || 2};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
