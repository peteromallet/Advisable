import React, { useRef, useState, useEffect } from "react";
import { useModal } from "@advisable/donut";
import { Heart } from "@styled-icons/heroicons-outline";
import { Heart as HeartFilled } from "@styled-icons/heroicons-solid";
import { useMutation, gql } from "@apollo/client";
import PostAction from "@guild/components/PostActions/PostAction";
import useViewer from "src/hooks/useViewer";
import HeartFirstUseModal from "./HeartFirstUseModal";

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

// When a user first interacts with the reaction button we show a modal to
// explain it. After this modal is shown once we set this key in local storage
// to prevent it from being shown again.
const LOCALSTORAGE_REACTION_MODAL = "guildReactionModal";

const ReactionsButton = ({ size, post }) => {
  const timer = useRef(null);
  const viewer = useViewer();
  const firstUseModal = useModal();
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

    if (!reacted && !window.localStorage.getItem(LOCALSTORAGE_REACTION_MODAL)) {
      window.localStorage.setItem(LOCALSTORAGE_REACTION_MODAL, true);
      firstUseModal.show();
    }

    if (!viewer?.guild) {
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

  return (
    <>
      <HeartFirstUseModal modal={firstUseModal} />
      <PostAction
        size={size}
        onClick={handleReaction}
        color={reacted ? "white" : "red600"}
        bg={reacted ? "red500" : "neutral100"}
        icon={reacted ? <HeartFilled /> : <Heart />}
      />
    </>
  );
};

export default ReactionsButton;
