import React from "react";
import { Text } from "@advisable/donut";
import { StyledStarRating, StyledStar } from "./styles";

const Star = () => (
  <StyledStar>
    <svg width={13} height={12} fill="none">
      <path
        d="M6.5 0l1.534 4.584H13L8.983 7.416 10.517 12 6.5 9.167 2.483 12l1.534-4.584L0 4.584h4.966L6.5 0z"
        fill="#fff"
      />
    </svg>
  </StyledStar>
);

const StarRating = () => (
  <>
    <StyledStarRating>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
      <br />
      <Text fontSize="xxs" mt="xs" fontWeight="semibold" color="white.9">
        9.3 out of 10
      </Text>
      <Text fontSize="xxs" mt="xxs" color="white.9">
        32 Ratings
      </Text>
    </StyledStarRating>
  </>
);

export default StarRating;
