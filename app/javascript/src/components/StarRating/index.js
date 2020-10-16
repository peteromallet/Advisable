import { Box, Text } from "@advisable/donut";
import { Star } from "@styled-icons/feather";

const SIZES = {
  s: 16,
  m: 18,
  l: 20,
};

const Icon = ({ filled, size }) => {
  return (
    <Box color={filled ? "neutral800" : "neutral300"}>
      <Star size={SIZES[size || "m"]} strokeWidth={0} fill="currentColor" />
    </Box>
  );
};

const StarRatingComponent = ({ rating, size, showNumber }) => {
  return (
    <Box display="flex" alignItems="center">
      {showNumber && (
        <Text
          lineHeight="1"
          fontSize="15px"
          marginRight="4px"
          marginBottom="-2px"
          color="neutral400"
        >
          {rating?.toFixed(1)}
        </Text>
      )}
      <Icon size={size} filled={rating >= 0.5} />
      <Icon size={size} filled={rating >= 1.5} />
      <Icon size={size} filled={rating >= 2.5} />
      <Icon size={size} filled={rating >= 3.5} />
      <Icon size={size} filled={rating >= 4.5} />
    </Box>
  );
};

StarRatingComponent.defaultProps = {
  showNumber: true,
};

export default StarRatingComponent;
