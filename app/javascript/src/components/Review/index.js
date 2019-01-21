import React from "react";
import Text from "src/components/Text";
import Heading from "src/components/Heading";
import StarRating from "src/components/StarRating";
import {
  Review,
  ReviewHeader,
  TotalRating,
  ReviewComment,
  Ratings,
  Rating
} from "./styles";

export default ({ review, companyName }) => {
  return (
    <Review>
      <ReviewHeader>
        <TotalRating>{review.ratings.overall.toFixed(1)}</TotalRating>
        <Heading level="5">{review.name}</Heading>
        <Text size="s">
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
      {review.comment && <ReviewComment>"{review.comment}"</ReviewComment>}
    </Review>
  );
};
