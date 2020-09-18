import React from "react";
import { motion } from "framer-motion";
import { useToggle } from "@guild/hooks/useToggle";
import { Text, useBreakpoint } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import GuildTag from "@guild/components/GuildTag";
import FilterIcon from "@guild/icons/Filter";
import AddIcon from "@guild/icons/Add";
import { feedStore } from "@guild/stores/Feed";

const Filters = () => {
  const sUp = useBreakpoint("sUp");
  const [expanded, toggleExpanded] = useToggle();
  const feedFilters = [
    "For You",
    "Opportunity",
    "Advice Required",
    "Case Study",
  ];

  const selectedFilter = feedStore(({ selectedFilter }) => selectedFilter);

  // TODO: update the search params w/ filters
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
            {...motionAnimations}
            fontSize="xxl"
            fontWeight="medium"
            color="catalinaBlue100"
          >
            Posts
          </Text>
        )}

        <GuildBox
          as={motion.div}
          {...motionAnimations}
          backgroundColor="white"
          spaceChildrenHorizontal={16}
          flexSpaceBetween={sUp}
          display="flex"
          p="m"
        >
          {expanded && (
            <GuildBox
              display="flex"
              flexDirection={sUp ? "row" : "column"}
              spaceChildrenHorizontal={sUp && 16}
              spaceChildrenVertical={!sUp && 16}
            >
              {feedFilters.map((filter, key) => (
                <motion.div key={key} {...motionAnimations}>
                  {filter === selectedFilter ? (
                    <GuildTag variant="dark" size={sUp ? "s" : "l"}>
                      {selectedFilter}
                    </GuildTag>
                  ) : (
                    <GuildTag
                      button
                      size={sUp ? "s" : "l"}
                      onClick={() => handleApplyFilter(filter)}
                    >
                      {filter}
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
              <FilterIcon width={24} height={24} />
            </GuildTag>

            {/* !sUp && !expanded && <GuildTag> Topics dropdown ...  */}

            <GuildTag button variant="cta" size="s" onClick={null}>
              <AddIcon width={20} height={20} />
              {!expanded && sUp && "Create Post"}
            </GuildTag>
          </GuildBox>
        </GuildBox>
      </GuildBox>
    </GuildBox>
  );
};

export default Filters;
