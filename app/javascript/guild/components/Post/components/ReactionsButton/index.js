import React, { useRef, useState, useEffect } from "react";
import { Heart } from "@styled-icons/heroicons-outline";
import { Heart as HeartFilled } from "@styled-icons/heroicons-solid";
import { useMutation, gql } from "@apollo/client";
import PostAction from "@guild/components/PostAction";

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
  const viewer = useViewer();
  const [reactToPost] = useMutation(GUILD_UPDATE_POST_REACTIONS);
  const [reacted, setReacted] = useState(post.reacted);
  const { id } = post;

  // in cases when the post might change then resync the reactions state.
  useEffect(() => {
    setReacted(post.reacted);
  }, [post]);

  // We want to prevet situations where someone can spam the react button to
  // send lots of unnecessary requests. We use state to update the UI
  // immediately and use setTimeout to delay the actual request by 500ms.
  const handleReaction = () => {
    clearTimeout(timer.current);
    if (!viewer?.guild) return;

    const reaction = reacted ? "NONE" : "THANK";
    setReacted(reacted ? false : true);

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
    <PostAction
      onClick={handleReaction}
      color={reacted ? "white" : "red600"}
      bg={reacted ? "red500" : "neutral100"}
      icon={reacted ? <HeartFilled /> : <Heart />}
    />
  );
};

export default ReactionsButton;
