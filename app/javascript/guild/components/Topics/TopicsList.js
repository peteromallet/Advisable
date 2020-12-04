import React from "react";
import { Stack, Button } from "@advisable/donut";
import { X } from "@styled-icons/feather";
import { useToggle } from "@guild/hooks/useToggle";
import ShowMore from "@guild/components/ShowMore";
import { feedStore } from "@guild/stores/Feed";
import Topic from "./components/Topic";

export default function TopicsList({ topics }) {
  const [moreTopics, toggleMoreTopics] = useToggle();
  const [selectedTopics, resetTopics] = feedStore((store) => [
    store.selectedTopics,
    store.resetTopics,
  ]);

  return (
    <>
      {!!selectedTopics.length && (
        <Button
          size="s"
          mb={4}
          variant="subtle"
          onClick={resetTopics}
          prefix={<X />}
        >
          Clear All
        </Button>
      )}
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
