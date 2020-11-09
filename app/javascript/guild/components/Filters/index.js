import React from "react";
import { motion } from "framer-motion";
import { useApolloClient } from "@apollo/client";
import { useToggle } from "@guild/hooks/useToggle";
import { Text, DialogDisclosure, useBreakpoint } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import GuildTag from "@guild/components/GuildTag";
import { Filter as FilterIcon, Add as AddIcon } from "@guild/icons";
import useViewer from "@advisable-main/hooks/useViewer";
import { feedStore } from "@guild/stores/Feed";
import { useComposerModal } from "@guild/components/ComposerModal/useComposerModal";
import ComposerModal from "../ComposerModal";
import { GUILD_POSTS_QUERY } from "@guild/components/Posts/queries";

const Filters = () => {
  const sUp = useBreakpoint("sUp");
  const [expanded, toggleExpanded] = useToggle();
  const viewer = useViewer();
  const composerModal = useComposerModal("/composer");
  const client = useApolloClient();

  const feedFilters = ["For You", "Opportunity", "AdviceRequired", "CaseStudy"];

  const [
    selectedFilter,
    selectedTopicsIds,
  ] = feedStore(({ selectedFilter, selectedTopicsIds }) => [
    selectedFilter,
    selectedTopicsIds,
  ]);

  const handlePublishedGuildPost = (guildPost) => {
    const previous = client.readQuery({
      query: GUILD_POSTS_QUERY,
      variables: { selectedFilter, selectedTopicsIds: selectedTopicsIds() },
    });
    const pageInfo = previous.guildPosts.pageInfo;

    client.writeQuery({
      query: GUILD_POSTS_QUERY,
      data: {
        guildPosts: {
          __typename: previous.guildPosts.__typename,
          nodes: [...previous.guildPosts.nodes, guildPost],
          pageInfo,
        },
      },
    });
  };

  const normalizeFilter = (name) => name.replace(/([A-Z])/g, " $1").trim();

  const handleApplyFilter = (selectedFilter) => {
    feedStore.setState({ selectedFilter });
    !sUp && toggleExpanded();
  };

  const motionAnimations = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.12 },
  };

  return (
    <>
      <ComposerModal
        modal={composerModal}
        specialistId={viewer.id}
        onPublish={handlePublishedGuildPost}
      />
      <GuildBox mt="l" flexCenterBoth>
        <GuildBox
          width="100%"
          flexBasis={{
            _: "100%",
            l: expanded ? "900px" : "640px",
            xl: expanded ? "75%" : "50%",
          }}
          mx={{ _: "s", s: "l" }}
          flexSpaceBetween={!expanded && sUp}
          flexCenterBoth={sUp}
        >
          {!expanded && sUp && (
            <Text
              as={motion.div}
              // {...motionAnimations}
              fontSize="xxl"
              fontWeight="medium"
              color="catalinaBlue100"
            >
              Posts
            </Text>
          )}

          <GuildBox
            as={motion.div}
            // {...motionAnimations}
            backgroundColor="white"
            spaceChildrenHorizontal={16}
            flexSpaceBetween={sUp}
            display="flex"
            p="m"
          >
            {expanded && (
              <GuildBox
                display="flex"
                alignItems="center"
                flexDirection={sUp ? "row" : "column"}
                spaceChildrenHorizontal={sUp && 16}
                spaceChildrenVertical={!sUp && 16}
              >
                {feedFilters.map((filter, key) => (
                  <motion.div key={key} {...motionAnimations}>
                    {filter === selectedFilter ? (
                      <GuildTag variant="dark" size={sUp ? "s" : "l"}>
                        {normalizeFilter(selectedFilter)}
                      </GuildTag>
                    ) : (
                      <GuildTag
                        button
                        size={sUp ? "s" : "l"}
                        onClick={() => handleApplyFilter(filter)}
                      >
                        {normalizeFilter(filter)}
                      </GuildTag>
                    )}
                  </motion.div>
                ))}
              </GuildBox>
            )}

            {!expanded && (
              <GuildTag variant="dark" size={sUp ? "s" : "l"}>
                {selectedFilter}
              </GuildTag>
            )}

            <GuildBox
              mx="auto"
              spaceChildrenHorizontal={16}
              display="flex"
              maxHeight={"34px"}
              flexSpaceBetween
            >
              <GuildTag button size="s" onClick={toggleExpanded}>
                <FilterIcon size={24} />
              </GuildTag>

              <DialogDisclosure
                button
                variant="cta"
                size="s"
                as={GuildTag}
                {...composerModal}
                aria-label="Create a Post"
              >
                <AddIcon size={20} />
                {/* {!expanded && sUp && "Create Post"} */}
              </DialogDisclosure>
            </GuildBox>
          </GuildBox>
        </GuildBox>
      </GuildBox>
    </>
  );
};

export default Filters;
