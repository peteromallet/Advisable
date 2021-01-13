import React from "react";
import { Box, Avatar, Text } from "@advisable/donut";

const Review = ({ review }) => {
  const { role, name, companyName } = review;
  const title = name ? `${role} at ${companyName}` : companyName;

  return (
    <Box>
      <Box display="flex" alignItems="center" marginBottom="s">
        <Avatar
          size="s"
          bg="neutral100"
          marginRight="12px"
          url={review.avatar}
          name={review.name}
        />
        <Box>
          <Text color="neutral900" marginBottom="2px">
            {name || role}
          </Text>
          <Text fontSize="14px" color="neutral500">
            {title}
          </Text>
        </Box>
      </Box>
      <Text fontSize="15px" lineHeight="22px" color="neutral800">
        &quot;{review.comment}&quot;
      </Text>
    </Box>
  );
};

export default Review;
