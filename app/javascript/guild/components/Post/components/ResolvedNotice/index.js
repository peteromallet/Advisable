import React from "react";
import { Box, Text, Notice, Tag } from "@advisable/donut";

const ResolvedNotice = ({ authorName }) => (
  <Notice marginBottom={5} padding="xs">
    <Box display="flex" alignItems="center">
      <Tag variant="quartz">Resolved</Tag>
      <Text marginLeft="sm" fontSize="14px" color="#8E8EA1">
        {authorName} is no longer looking for connections on this post
      </Text>
    </Box>
  </Notice>
);

export default ResolvedNotice;
