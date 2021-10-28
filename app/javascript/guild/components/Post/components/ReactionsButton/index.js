import React, { useRef, useState, useEffect } from "react";
import { Tooltip } from "@advisable/donut";
import { Bulb } from "@styled-icons/ionicons-outline/Bulb";
import { Bulb as BulbFilled } from "@styled-icons/ionicons-solid/Bulb";
import { useMutation, gql } from "@apollo/client";
import PostAction from "@guild/components/PostActions/PostAction";
import useViewer from "src/hooks/useViewer";

export const GUILD_UPDATE_POST_REACTIONS = gql`
  mutation guildUpdatePostReactions($input: GuildUpdatePostReactionsInput!) {
    guildUpdatePostReactions(input: $input) {
      guildPost {
        id
        reacted
      }
    }
  }
`;

const ReactionsButton = ({ size, post, walkthrough = false }) => {
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

    if (!viewer?.isSpecialist && !viewer?.isAccepted) {
      const cta = document.getElementById("joinGuild");
      cta?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const reaction = reacted ? "NONE" : "THANK";
    setReacted(reacted ? false : true);

    reactToPost({
      variables: {
        input: {
          guildPostId: id,
          reaction,
        },
      },
    });
    timer.current = setTimeout(() => {}, 500);
  };

  const author = post.author.firstName;

  return (
    <>
      <Tooltip
        placement="top"
        textAlign="center"
        maxWidth={200}
        content={`Let ${author} know you found this post interesting`}
      >
        <PostAction
          size={size}
          onClick={handleReaction}
          aria-label="Mark as interesting"
          color={reacted ? "white" : "yellow700"}
          bg={reacted ? "yellow500" : "yellow100"}
          icon={reacted ? <BulbFilled /> : <Bulb />}
          data-walkthrough={walkthrough ? "postReaction" : null}
        />
      </Tooltip>
    </>
  );
};

export default ReactionsButton;
