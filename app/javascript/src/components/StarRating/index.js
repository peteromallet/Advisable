import React from "react";
import { StarRating, Star, Number } from "./styles";

const SIZES = {
  m: {
    width: 18,
    height: 16
  },
  l: {
    width: 20,
    height: 18
  }
};

const Icon = ({ filled, size }) => {
  if (filled) {
    return (
      <svg width={SIZES[size || "m"].width} height={SIZES[size || "m"].height}>
        <path
          d="M8.941 0l2.364 5.625 6.136.486-4.675 3.964L14.195 16 8.94 12.825 3.688 16l1.428-5.925L.441 6.11l6.136-.486L8.941 0z"
          fill="#F90"
        />
      </svg>
    );
  }

  return (
    <svg width={SIZES[size || "m"].width} height={SIZES[size || "m"].height}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.862 5.625L9.498 0 7.134 5.625.998 6.11l4.675 3.964L4.245 16l5.253-3.175L14.751 16l-1.428-5.925 4.675-3.964-6.136-.486zm3.64 1.292l-4.326-.344-1.678-3.992L7.82 6.573l-4.326.344L6.79 9.71l-1.011 4.194 3.719-2.248 3.72 2.248-1.011-4.194 3.295-2.793z"
        fill="#F90"
      />
    </svg>
  );
};

const StarRatingComponent = ({ rating, size, showNumber }) => {
  return (
    <StarRating>
      {showNumber && <Number>{rating.toFixed(1)}</Number>}
      <Star>
        <Icon size={size} filled={rating >= 1} />
      </Star>
      <Star>
        <Icon size={size} filled={rating >= 2} />
      </Star>
      <Star>
        <Icon size={size} filled={rating >= 3} />
      </Star>
      <Star>
        <Icon size={size} filled={rating >= 4} />
      </Star>
      <Star>
        <Icon size={size} filled={rating >= 5} />
      </Star>
    </StarRating>
  );
};

StarRatingComponent.defaultProps = {
  showNumber: true
};

export default StarRatingComponent;
