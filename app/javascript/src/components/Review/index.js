import React from "react";
import { Text } from "@advisable/donut";
import StarRating from "src/components/StarRating";
import {
  Review as StyledReview,
  ReviewHeader,
  TotalRating,
  Ratings,
  Rating,
} from "./styles";

const Review = ({ review, companyName }) => {
  return (
    <StyledReview>
      <ReviewHeader>
        <TotalRating>{review.ratings.overall.toFixed(1)}</TotalRating>
        <Text as="h5" fontWeight="medium" mb="xxs">
          {review.name}
        </Text>
        <Text size="xs" color="neutral.6">
          {review.role} at {companyName}
        </Text>
      </ReviewHeader>
      <Ratings>
        {review.ratings.skills && (
          <Rating>
            <strong>Skills</strong>
            <StarRating showNumber={false} rating={review.ratings.skills} />
          </Rating>
        )}
        {review.ratings.qualityOfWork && (
          <Rating>
            <strong>Quality of work</strong>
            <StarRating
              showNumber={false}
              rating={review.ratings.qualityOfWork}
            />
          </Rating>
        )}
        {review.ratings.adherenceToSchedule && (
          <Rating>
            <strong>Schedule adherence</strong>
            <StarRating
              showNumber={false}
              rating={review.ratings.adherenceToSchedule}
            />
          </Rating>
        )}
        {review.ratings.availability && (
          <Rating>
            <strong>Availability</strong>
            <StarRating
              showNumber={false}
              rating={review.ratings.availability}
            />
          </Rating>
        )}
        {review.ratings.communication && (
          <Rating>
            <strong>Communication</strong>
            <StarRating
              showNumber={false}
              rating={review.ratings.communication}
            />
          </Rating>
        )}
      </Ratings>
      {review.comment && (
        <Text fontSize="xs" lineHeight="s" color="neutral.7" fontStyle="italic">
          "{review.comment}"
        </Text>
      )}
    </StyledReview>
  );
};

export default Review;
