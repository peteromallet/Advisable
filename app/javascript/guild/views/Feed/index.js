import React from "react";
import { Box, useBreakpoint } from "@advisable/donut";
import Sticky from "react-stickynode";
import Posts from "@guild/components/Posts";
import Topics from "@guild/components/Topics";
import FeaturedMembers from "@guild/components/FeaturedMembers";

const Feed = () => {
  const lUp = useBreakpoint("lUp");

  return (
    <Box
      paddingX="6"
      paddingY="2xl"
      marginX="auto"
      display="flex"
      maxWidth="1300px"
    >
      {lUp && (
        <Box width="200px" flexShrink="0">
          <Sticky top={98} enabled>
            <Topics />
          </Sticky>
        </Box>
      )}
      <Box width="100%" paddingX={{ _: null, l: "xl" }}>
        <Posts />
      </Box>
      {lUp && (
        <Box width="260px" flexShrink="0">
          <Sticky top={98} enabled>
            <FeaturedMembers />
          </Sticky>
        </Box>
      )}
    </Box>
  );
};

export default Feed;
