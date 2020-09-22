import React from "react";
import styled from "styled-components";
import { Box, Text, Link, theme } from "@advisable/donut";
import Comments from "@guild/icons/Comments";

const CommentsButton = ({ postId, commentsCount }) => (
  <StyledButton
    as={Link}
    px="s"
    py="xxs"
    display="flex"
    alignSelf="flex-start"
    background="white"
    borderRadius={8}
    to={{
      pathname: `/posts/${postId}`,
      hash: "#comments",
      state: { commentsAnchor: true },
    }}
  >
    <Text fontSize="xs" mr="xs" color="catalinaBlue100">
      {commentsCount || "0"}
    </Text>
    <Comments width={16} height={16} />
  </StyledButton>
);

const StyledButton = styled(Box)`
  box-shadow: ${theme.shadows.xs};
  svg {
    fill: ${theme.colors.catalinaBlue100};
  }
  &:hover {
    text-decoration: none;
    svg {
      fill: ${theme.colors.froly100};
      transition: fill 0.2s ease;
    }
  }
`;

export default CommentsButton;
