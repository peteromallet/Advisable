import React from "react";
import { Stack } from "@advisable/donut";
import { useToggle } from "@guild/hooks/useToggle";
import ShowMore from "@guild/components/ShowMore";
import Topic from "./components/Topic";

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
    </>
  );
}
