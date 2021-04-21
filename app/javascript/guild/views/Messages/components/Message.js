import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { relativeDate } from "@guild/utils";
import { Calendar } from "@styled-icons/ionicons-outline/Calendar";
import { Box, Avatar, Text, Link, Button } from "@advisable/donut";

function contextMessage(type) {
  switch (type) {
    case "AdviceRequired":
      return "has offered help for your post:";
    default: {
      return "wants to connect with you over your post:";
    }
  }
}

function MessageContext({ author, message }) {
  if (!message.attributes?.calendlyLink) return null;
  const { post, postType, postTitle } = message.attributes;
  const safeName = (name) => name || "Deleted User";

  return (
    <Box
      mb={2}
      padding={3}
      pb={1}
      border="1px solid"
      borderRadius="12px"
      borderColor="neutral200"
    >
      <Text lineHeight="1.2rem" mb={3}>
        <Link
          variant="dark"
          fontWeight="medium"
          to={`/freelancers/${author?.id}`}
        >
          {safeName(author?.name)}
        </Link>
        {` ${contextMessage(postType)} `}
        <Link
          css={`
            display: inline;
          `}
          variant="dark"
          fontWeight="medium"
          to={`/posts/${post}`}
        >
          {postTitle}
        </Link>
      </Text>

      <Button
        as="a"
        href={message.attributes?.calendlyLink}
        target="_blank"
        rel="noreferrer noopener"
        prefix={<Calendar />}
        mb={2}
        size="s"
      >
        Book a call with {safeName(author?.firstName)}
      </Button>
    </Box>
  );
}

export default function Message({ message, author, isAuthor }) {
  const safeName = author?.name || "Deleted User";

  return (
    <Box display="flex" justifyContent={isAuthor ? "flex-end" : "flex-start"}>
      <Box
        display="flex"
        alignItems="flex-end"
        maxWidth={{ _: "100%", m: "90%" }}
      >
        {!isAuthor ? (
          <Box flexShrink="0" mr={2}>
            <Avatar
              size="xxs"
              as={author && RouterLink}
              to={`/freelancers/${author?.id}/guild`}
              url={author?.avatar}
              name={safeName}
            />
          </Box>
        ) : null}
        <Box
          display="flex"
          flexDirection="column"
          alignItems={isAuthor ? "flex-end" : "flex-start"}
        >
          <MessageContext author={author} message={message} />
          <Box
            py={2}
            px={3}
            fontSize="md"
            flexShrink="1"
            marginBottom={2}
            color="neutral800"
            maxWidth={["250px", "280px", "360px", "520px", "640px"]}
            lineHeight="1.2rem"
            borderRadius="12px"
            bg={isAuthor ? "blue200" : "white"}
            boxShadow="0 4px 8px -4px rgba(0, 0, 0, 0.2)"
          >
            <Text fontSize="xs" mb={0.5} fontWeight="medium">
              {safeName}
            </Text>
            <Text
              autoLink
              data-message
              css={`
                white-space: pre-line;
                overflow-wrap: break-word;
              `}
            >
              {message.body}
            </Text>
          </Box>
          <Text
            fontSize="2xs"
            color="neutral400"
            ml={isAuthor ? null : 1}
            mr={isAuthor ? 1 : null}
            textAlign={isAuthor ? "right" : "left"}
          >
            {relativeDate(message.dateCreated)}
          </Text>
        </Box>
        {isAuthor ? (
          <Box flexShrink="0" ml={2}>
            <Avatar
              size="xxs"
              as={Link}
              name={author.name}
              url={author.avatar}
              to={`/freelancers/${author.id}/guild`}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
