import React from "react";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";
import Review from "./Review";

function Reviews({ data }) {
  const { t } = useTranslation();
  const reviews = data.specialist.reviews;
  const name = data.specialist.firstName;

  if (reviews.length === 0) {
    return (
      <Box py="l" textAlign="center">
        <Text color="neutral900" mb="xs" fontWeight="medium">
          No Reviews
        </Text>
        <Text color="neutral700">{name} does not have any reviews yet.</Text>
      </Box>
    );
  }

  return (
    <>
      <Text
        fontSize="xl"
        color="blue.9"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        {t("nouns.reviewCount", { count: reviews.length })}
      </Text>
      <Box width="100%" mt="m" height={1} bg="neutral.3" />
      {reviews.map(review => (
        <Review key={review.id} review={review} />
      ))}
    </>
  );
}

export default Reviews;
