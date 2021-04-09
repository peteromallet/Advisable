import React from "react";
import { Box, useBreakpoint } from "@advisable/donut";
import { useParams } from "react-router-dom";
import Sticky from "react-stickynode";
import Posts from "@guild/components/Posts";
import Topics from "@guild/components/Topics";
import FeaturedMembers from "@guild/components/FeaturedMembers";
import FeedWalkthrough from "./FeedWalkthrough";
import Referral from "@guild/components/Referral";
import TopicPosts from "@guild/components/TopicPosts";
import SuggestedConnection from "@guild/components/SuggestedConnection";

const Feed = () => {
  const lUp = useBreakpoint("lUp");
  const { topicId } = useParams();

  return (
    <Box
      paddingX={[4, 6]}
      paddingY={[6, 10]}
      marginX="auto"
      display="flex"
      maxWidth="1300px"
    >
      {lUp && (
        <>
          <FeedWalkthrough />
          <Box width="200px" flexShrink="0">
            <Sticky top={98} enabled>
              <Topics />
            </Sticky>
          </Box>
        </>
      )}
      <Box width="100%" paddingX={{ _: null, l: "xl" }} minWidth="0">
        {topicId ? <TopicPosts topicId={topicId} /> : <Posts />}
      </Box>
      {lUp && (
        <Box width="260px" flexShrink="0">
          <Sticky top={98} enabled>
            <SuggestedConnection />
            <FeaturedMembers />
            <Referral />
          </Sticky>
        </Box>
      )}
    </Box>
  );
};

export default Feed;
