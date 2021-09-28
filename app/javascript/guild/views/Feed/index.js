import React from "react";
import { Box, useBreakpoint } from "@advisable/donut";
import { useRouteMatch } from "react-router-dom";
import Sticky from "react-stickynode";
import Posts from "@guild/components/Posts";
import Topics from "@guild/components/Topics";
import FeedWalkthrough from "./FeedWalkthrough";
import TopicPosts from "@guild/components/TopicPosts";
import Sidebar from "./components/Sidebar";

const Feed = () => {
  const lUp = useBreakpoint("lUp");
  const { topicId } = useRouteMatch("/guild/topics/:topicId")?.params || {};
  const MemoizedTopicPosts = React.memo(TopicPosts);

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
        {topicId ? <MemoizedTopicPosts topicId={topicId} /> : <Posts />}
      </Box>
      {lUp && <Sidebar />}
    </Box>
  );
};

export default Feed;
