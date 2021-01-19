import React from "react";
import { Box, Avatar, Text, Circle } from "@advisable/donut";
import { CheckCircle } from "@styled-icons/feather";

const Review = ({ review }) => {
  const { role, name, companyName } = review;
  const title = name ? `${role} at ${companyName}` : companyName;

  return (
    <Box>
      <Box display="flex" alignItems="center" marginBottom="s">
        <Box position="relative" mr={3}>
          <Avatar size="s" bg="neutral100" url={review.avatar} name={name} />
          <Box color="blue400" position="absolute" right="-4px" bottom="0">
            <Circle bg="white" size={18}>
              <CheckCircle size={16} strokeWidth={3} />
            </Circle>
          </Box>
        </Box>
        <Box>
          <Text color="neutral900" marginBottom="2px">
            Reviewed by {name || role}
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
