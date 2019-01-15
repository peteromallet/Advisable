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
        <Rating>
          <strong>Skills</strong>
          <StarRating showNumber={false} rating={review.ratings.skills} />
        </Rating>
        <Rating>
          <strong>Quality of work</strong>
          <StarRating showNumber={false} rating={review.ratings.qualityOfWork} />
        </Rating>
        <Rating>
          <strong>Schedule adherence</strong>
          <StarRating showNumber={false} rating={review.ratings.adherenceToSchedule} />
        </Rating>
        <Rating>
          <strong>Availability</strong>
          <StarRating showNumber={false} rating={review.ratings.availability} />
        </Rating>
        <Rating>
          <strong>Communication</strong>
          <StarRating showNumber={false} rating={review.ratings.communication} />
        </Rating>
      </Ratings>
      {review.comment && <ReviewComment>"{review.comment}"</ReviewComment>}
    </Review>
  );
};
