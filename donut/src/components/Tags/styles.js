import styled from "styled-components";
import Box from "../Box/styles";
import StyledTag from "../Tag/styles";

export const StyledTags = styled(Box)`
  &::after {
    content: "";
    margin-bottom: -8px;
    display: block;
    height: 0;
  }

  ${StyledTag} {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;
