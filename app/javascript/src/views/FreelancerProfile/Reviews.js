import React from "react";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";
import Review from "./Review";

function Reviews({ data }) {
  const { t } = useTranslation();
  const reviews = data.specialist.reviews;

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
