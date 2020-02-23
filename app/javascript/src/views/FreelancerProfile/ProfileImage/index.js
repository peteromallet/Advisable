import React, { useState, useEffect } from "react";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";
import Star from "./Star";
import {
  StyledProfileImage,
  StyledImageGradient,
  StyledImageContent,
} from "./styles";

function ProfileImage({ data }) {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const specialist = data.specialist;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = specialist.avatar;
  }, [specialist]);

  return (
    <Box
      height={360}
      bg="neutral.1"
      borderRadius={12}
      overflow="hidden"
      position="relative"
    >
      <StyledImageGradient />
      <StyledProfileImage loaded={imageLoaded} url={specialist.avatar} />
      <StyledImageContent>
        <Text
          mb="xxs"
          fontSize="xxl"
          color="white.9"
          fontWeight="semibold"
          letterSpacing="-0.03em"
        >
          {specialist.name}
        </Text>
        <Text
          mb="xs"
          color="white.9"
          fontWeight="regular"
          letterSpacing="-0.01em"
        >
          {specialist.location}
        </Text>
        <Box mb="2px">
          <Star filled={specialist.ratings.overall >= 1} />
          <Star filled={specialist.ratings.overall >= 2} />
          <Star filled={specialist.ratings.overall >= 3} />
          <Star filled={specialist.ratings.overall >= 4} />
          <Star filled={specialist.ratings.overall >= 5} />
        </Box>
        <Text
          fontSize="xs"
          color="white.9"
          fontWeight="regular"
          letterSpacing="-0.01em"
        >
          {t("nouns.reviewCount", { count: specialist.reviews.length })}
        </Text>
      </StyledImageContent>
    </Box>
  );
}

export default ProfileImage;
