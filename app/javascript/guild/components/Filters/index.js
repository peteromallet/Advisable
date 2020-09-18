import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { useToggle } from "@guild/hooks/useToggle";
import { Text } from "@advisable/donut";
import { getUrlParams } from "@guild/utils";
import { GuildBox } from "@guild/styles";
import GuildTag from "@guild/components/GuildTag";
import FilterIcon from "@guild/icons/Filter";
import AddIcon from "@guild/icons/Add";
import { feedStore } from "@guild/stores/Feed";

const Filters = () => {
  const { search } = useLocation();
  const history = useHistory();
  const params = getUrlParams(search);

  const [expanded, toggleExpanded] = useToggle();
  const feedFilters = [
    "For You",
    "Opportunity",
    "Advice Required",
    "Case Study",
  ];
  const selectedFilter = feedStore(
    (state) => params.selectedFilter || state.selectedFilter,
  );

  const handleApplyFilter = (selectedFilter) => {
    feedStore.setState({ selectedFilter });
    const params = { selectedFilter };
    const filterParams = new URLSearchParams(params).toString();
    history.replace({ search: `?${filterParams}` });
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
        mx={{ _: "24px", l: "0" }}
        flexSpaceBetween={!expanded}
        flexCenterBoth
      >
        {!expanded && (
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
          p="s"
        >
          {expanded &&
            feedFilters.map((filter, key) => (
              <motion.div key={key} {...motionAnimations}>
                {filter === selectedFilter ? (
                  <GuildTag variant="dark" size="s">
                    {selectedFilter}
                  </GuildTag>
                ) : (
                  <GuildTag
                    button
                    size="s"
                    onClick={() => handleApplyFilter(filter)}
                  >
                    {filter}
                  </GuildTag>
                )}
              </motion.div>
            ))}

          {!expanded && (
            <GuildTag variant="dark" size="s">
              {selectedFilter}
            </GuildTag>
          )}
          <GuildTag button size="s" onClick={toggleExpanded}>
            <FilterIcon width={24} height={24} />
          </GuildTag>

          <GuildTag button variant="cta" size="s" onClick={null}>
            <AddIcon width={20} height={20} />
            Create Post
          </GuildTag>
        </GuildBox>
      </GuildBox>
    </GuildBox>
  );
};

export default Filters;
