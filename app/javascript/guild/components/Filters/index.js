import React from "react";
import { motion } from "framer-motion";
import { useApolloClient } from "@apollo/client";
import { useToggle } from "@guild/hooks/useToggle";
import { Box, Text, DialogDisclosure, useBreakpoint } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import GuildTag from "@guild/components/GuildTag";
import { Filter as FilterIcon, Add as AddIcon } from "@guild/icons";
import useViewer from "@advisable-main/hooks/useViewer";
import { useComposerModal } from "@guild/components/ComposerModal/useComposerModal";
import ComposerModal from "../ComposerModal";
import { GUILD_POSTS_QUERY } from "@guild/components/Posts/queries";

const Filters = ({ postTypeFilter, setPostTypeFilter, yourPosts }) => {
  const viewer = useViewer();
  const client = useApolloClient();
  const sUp = useBreakpoint("sUp");
  const [expanded, toggleExpanded] = useToggle();
  const composerModal = useComposerModal("/guild/composer");

  const postTypeFilters = [
    "For You",
    "Opportunity",
    "AdviceRequired",
    "CaseStudy",
  ];

  const handlePublishedGuildPost = (guildPost) => {
    const variables = { type: postTypeFilter, withPopularPosts: true };
    const previous = client.readQuery({
      query: GUILD_POSTS_QUERY,
      variables,
    });
    const { pageInfo } = previous?.guildPosts;
    const guildPopularPosts = previous?.guildPopularPosts;

    client.writeQuery({
      query: GUILD_POSTS_QUERY,
      data: {
        guildPosts: {
          __typename: previous.guildPosts.__typename,
          edges: [
            { __typename: "PostInterfaceEdge", node: guildPost },
            ...previous.guildPosts.edges,
          ],
          pageInfo,
        },
        guildPopularPosts,
      },
      variables,
    });
  };

  const handleApplyFilter = (selected) => {
    setPostTypeFilter(selected);
    !sUp && toggleExpanded();
  };

  const motionAnimations = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.12 },
  };

  return (
    <Box marginBottom="lg">
      <ComposerModal
        modal={composerModal}
        specialistId={viewer.id}
        onPublish={handlePublishedGuildPost}
      />
      <GuildBox flexCenterBoth>
        <GuildBox
          width="100%"
          flexSpaceBetween={!expanded && sUp}
          flexCenterBoth={sUp}
        >
          {!expanded && sUp && (
            <Text
              fontSize="3xl"
              fontWeight="medium"
              color="catalinaBlue100"
              letterSpacing="-0.02em"
            >
              {yourPosts ? "Your Posts" : "Posts"}
            </Text>
          )}

          <GuildBox
            as={motion.div}
            spaceChildrenHorizontal={16}
            flexSpaceBetween={sUp}
            display="flex"
          >
            {expanded && (
              <GuildBox
                display="flex"
                alignItems="center"
                flexDirection={sUp ? "row" : "column"}
                spaceChildrenHorizontal={sUp && 16}
                spaceChildrenVertical={!sUp && 16}
              >
                {postTypeFilters.map((postType, key) => {
                  const normalizedType = postType
                    .replace(/([A-Z])/g, " $1")
                    .trim();
                  return (
                    <motion.div key={key} {...motionAnimations}>
                      {postType === postTypeFilter ? (
                        <GuildTag variant="dark" size={sUp ? "s" : "l"}>
                          {normalizedType}
                        </GuildTag>
                      ) : (
                        <GuildTag
                          button
                          size={sUp ? "s" : "l"}
                          onClick={() => handleApplyFilter(postType)}
                        >
                          {normalizedType}
                        </GuildTag>
                      )}
                    </motion.div>
                  );
                })}
              </GuildBox>
            )}

            {!expanded && !yourPosts && (
              <GuildTag variant="dark" size={sUp ? "s" : "l"}>
                {postTypeFilter}
              </GuildTag>
            )}

            <GuildBox
              mx="auto"
              spaceChildrenHorizontal={16}
              display="flex"
              maxHeight={"34px"}
              flexSpaceBetween
            >
              {!yourPosts && (
                <GuildTag
                  button
                  size="s"
                  aria-label="Toggle post filters"
                  onClick={toggleExpanded}
                >
                  <FilterIcon size={24} />
                </GuildTag>
              )}

              <DialogDisclosure
                button
                variant="cta"
                size="m"
                as={GuildTag}
                {...composerModal}
                aria-label="Create a Post"
                data-walkthrough="createPost"
              >
                <AddIcon size={22} />
                {!expanded ? "Write a Post" : null}
              </DialogDisclosure>
            </GuildBox>
          </GuildBox>
        </GuildBox>
      </GuildBox>
    </Box>
  );
};

export default Filters;
