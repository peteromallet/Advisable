import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { Box, Text, theme } from "@advisable/donut";
import { Thanks } from "@guild/icons";
import ReactTooltip from "react-tooltip";

export const GUILD_UPDATE_POST_REACTIONS = gql`
  mutation guildUpdatePostReactions($input: GuildUpdatePostReactionsInput!) {
    guildUpdatePostReactions(input: $input) {
      guildPost {
        id
        reactionsCount
        reacted
      }
    }
  }
`;

const ReactionsButton = ({ post }) => {
  const timer = useRef(null);
  const [reactToPost] = useMutation(GUILD_UPDATE_POST_REACTIONS);
  const [reacted, setReacted] = useState(post.reacted);
  const [reactionsCount, setReactionsCount] = useState(post.reactionsCount);
  const { id } = post;

  // in cases when the post might change then resync the reactions state.
  useEffect(() => {
    setReacted(post.reacted);
    setReactionsCount(post.reactionsCount);
  }, [post]);

  // We want to prevet situations where someone can spam the react button to
  // send lots of unnecessary requests. We use state to update the UI
  // immediately and use setTimeout to delay the actual request by 500ms.
  const handleReaction = () => {
    clearTimeout(timer.current);

    const reaction = reacted ? "NONE" : "THANK";
    setReacted(reacted ? false : true);
    setReactionsCount(reacted ? reactionsCount - 1 : reactionsCount + 1);

    timer.current = setTimeout(() => {
      reactToPost({
        variables: {
          input: {
            guildPostId: id,
            reaction,
          },
        },
      });
    }, 500);
  };

  return (
    <StyledButton
      px="s"
      py="xxs"
      display="flex"
      alignSelf="flex-start"
      alignItems="center"
      background="white"
      borderRadius={8}
      reacted={reacted}
      onClick={handleReaction}
      data-tip="Give Thanks"
    >
      <ReactTooltip backgroundColor={theme.colors.catalinaBlue100} />
      <Text fontSize="xs" mr="xs" color={reacted ? "white" : "catalinaBlue100"}>
        {reactionsCount || "0"}
      </Text>
      <Thanks size={18} />
    </StyledButton>
  );
};

const StyledButton = styled(Box)`
  cursor: pointer;
  outline: none;
  user-select: none;
  box-shadow: ${theme.shadows.xs};
  svg {
    fill: ${theme.colors.catalinaBlue100};
  }
  &:hover {
    text-decoration: none;
    svg {
      fill: ${(props) => (props.reacted ? "white" : theme.colors.froly50)};
      transition: fill 0.2s ease;
    }
  }
  ${({ reacted }) =>
    reacted &&
    css`
      background: ${theme.colors.froly50};
      svg {
        fill: white;
        transition: fill 0.2s ease;
      }
    `}
`;

export default ReactionsButton;
