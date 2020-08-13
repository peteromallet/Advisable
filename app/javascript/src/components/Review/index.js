import React from "react";
import { Box, Avatar, Text } from "@advisable/donut";
import StarRating from "src/components/StarRating";

function Rating({ label, rating }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Text color="neutral600" fontSize="14px">
        {label}
      </Text>
      <StarRating size="l" rating={rating} showNumber={false} />
    </Box>
  );
}

const Review = ({ review, companyName }) => {
  return (
    <Box>
      <Box display="flex" alignItems="center" marginBottom="m">
        <Avatar
          size="s"
          url={null}
          bg="neutral100"
          marginRight="12px"
          name={review.companyName}
        />
        <Box>
          <Text color="neutral900" marginBottom="2px">
            {review.name}
          </Text>
          <Text fontSize="14px" color="neutral500">
            {review.role} at {review.companyName}
          </Text>
        </Box>
      </Box>
      <Box
        display="grid"
        gridRowGap="8px"
        marginBottom="24px"
        gridColumnGap="48px"
        gridTemplateColumns={["1fr", "1fr 1fr"]}
      >
        <Rating label="Skills" rating={review.ratings?.skills} />
        <Rating label="Communication" rating={review.ratings?.communication} />
        <Rating
          label="Quality of Work"
          rating={review.ratings?.qualityOfWork}
        />
        <Rating label="Availability" rating={review.ratings?.availability} />
        <Rating label="Time Management" rating={review.ratings?.skills} />
      </Box>
      <Text fontSize="15px" lineHeight="22px" color="neutral800">
        &quot;{review.comment}&quot;
      </Text>
    </Box>
  );
};

export default Review;
