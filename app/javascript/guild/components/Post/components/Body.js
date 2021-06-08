import React from "react";
import { Pin } from "@styled-icons/ionicons-solid/Pin";
import { Box, Text, Notice } from "@advisable/donut";
import Topics from "./Topics";
import Markdown from "@guild/components/Markdown";
import PostActions from "@guild/components/PostActions";
import ConnectionsCount from "@guild/components/ConnectionsCount";
import ResolvedNotice from "./ResolvedNotice";
import PopularNotice from "./PopularNotice";
import { guildPostUrl, isGuildPath } from "@guild/utils";
import { Link as RouterLink, useHistory } from "react-router-dom";

export default function Body({
  post,
  showEdit = false,
  showShare = false,
  showDelete = false,
  showResolve = false,
  walkthrough = false,
  popularOrAuthorReactions = false,
}) {
  const url = guildPostUrl(post.id);
  const history = useHistory();
  const handleOpen = () => {
    // We need to use an actual page load while the guild pack is separate.
    isGuildPath ? history.push(url) : (window.location = url);
  };
  const LinkOrExternal = isGuildPath ? RouterLink : Link.External;

  return (
    <>
      <Text
        pb={4}
        display="block"
        fontSize={["2xl", "4xl"]}
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.03rem"
        as={LinkOrExternal}
        to={url}
        href={url}
      >
        {post.title}
      </Text>
      <Box mb={6} onClick={handleOpen} style={{ cursor: "pointer" }}>
        <Markdown>{post.excerpt}</Markdown>
      </Box>

      <Text
        mb={6}
        display="inline-block"
        color="blue700"
        as={LinkOrExternal}
        href={url}
        to={url}
      >
        Read more
      </Text>

      {post.resolved ? (
        <ResolvedNotice authorName={post.author.firstName} />
      ) : (
        <Box display="flex" alignItems="center" marginBottom={5}>
          <PostActions
            mr={3}
            post={post}
            showEdit={showEdit}
            showShare={showShare}
            showDelete={showDelete}
            showResolve={showResolve}
            walkthrough={walkthrough}
          />
          <ConnectionsCount post={post} />
        </Box>
      )}

      <Topics walkthrough={walkthrough} topics={post.guildTopics} />

      {post.pinned && (
        <Notice mt={4} icon={<Pin />} padding={3} variant="orange">
          This post has been pinned by the Advisable team
        </Notice>
      )}

      {popularOrAuthorReactions && (
        <PopularNotice
          post={post}
          marginTop="8"
          marginBottom={["-20px", "-30px"]}
        />
      )}
    </>
  );
}
