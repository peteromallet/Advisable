import React from "react";
import styled from "styled-components";
import { Add } from "@styled-icons/ionicons-outline/Add";
import {
  theme,
  Box,
  Text,
  StyledText,
  Link,
  Circle,
  StyledCircle,
} from "@advisable/donut";

export const StyledButton = styled.button`
  height: 400px;
  cursor: pointer;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 100%;
  transition: all 200ms;
  box-shadow: 0px 0px 0px rgba(56, 56, 56, 0), 0px 0px 0px rgba(0, 0, 0, 0);

  border: solid 2px transparent;
  border-radius: 12px;
  background-image: linear-gradient(#f6f6f7, #f6f6f7),
    radial-gradient(circle at top left, #fff, #fff);
  background-origin: border-box;
  background-clip: content-box, border-box;

  &:hover {
    box-shadow: 0px 8px 16px rgba(56, 56, 56, 0.08),
      0px 16px 60px rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.1);
    background-image: linear-gradient(#f6f6f7, #f6f6f7),
      radial-gradient(circle at top left, #b230f6, #2a61f6);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  &:hover ${StyledText} {
    color: ${theme.colors.neutral700};
    background: -webkit-linear-gradient(top right, #b230f6, #2a61f6);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover ${StyledCircle} {
    background: radial-gradient(circle at top right, #b230f6, #2a61f6);
  }
`;

export default function CreateSavedSearchButton() {
  return (
    <Link to="/explore/new">
      <StyledButton>
        <Box textAlign="center" mb={8}>
          <Circle
            color="#f6f6f7"
            background="rgba(0, 0, 0, 0.1)"
            size={48}
            mb={6}
          >
            <Add />
          </Circle>
          <Text color="neutral400" fontSize="m">
            Create a recommendation
          </Text>
        </Box>
      </StyledButton>
    </Link>
  );
}
