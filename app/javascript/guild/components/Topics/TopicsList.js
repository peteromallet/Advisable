import React from "react";
import css from "@styled-system/css";
import { Stack, Box, Text } from "@advisable/donut";
import { Tag } from "@styled-icons/heroicons-solid";
import { useToggle } from "@guild/hooks/useToggle";
import ShowMore from "@guild/components/ShowMore";
import Topic from "./components/Topic";
import { Link } from "react-router-dom";

export default function TopicsList({ topics }) {
  const [moreTopics, toggleMoreTopics] = useToggle();

  return (
    <>
      <Stack spacing={0.5} marginBottom="lg">
        {topics.map(
          (topic, key) =>
            (moreTopics || key < topics.length / 2.5) && (
              <Topic key={key} topic={topic} />
            ),
        )}
      </Stack>

      <ShowMore showingMore={moreTopics} onToggle={toggleMoreTopics} />

      <Box height="1px" bg="neutral200" marginY={6} />

      <Link to="/guild/topics">
        <Box
          display="flex"
          as="span"
          color="neutral700"
          alignItems="center"
          css={css({
            "&:hover": {
              color: "neutral900",
            },
          })}
        >
          <Tag size={16} />
          <Text ml={1.5}>Customize topics</Text>
        </Box>
      </Link>
    </>
  );
}
