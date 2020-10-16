import { useState, useEffect } from "react";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";
import Star from "./Star";
import {
  StyledProfileImage,
  StyledImageGradient,
  StyledImageContent,
  StyledProfileImageWrapper,
} from "./styles";

function ProfileImage({ name, imageURL, location, rating, reviewsCount }) {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = imageURL;
  }, [imageURL]);

  return (
    <StyledProfileImageWrapper>
      <StyledImageGradient />
      <StyledProfileImage loaded={imageLoaded} url={imageURL} />
      <StyledImageContent>
        <Text
          mb="xxs"
          fontSize="xxl"
          color="white"
          fontWeight="semibold"
          letterSpacing="-0.03em"
        >
          {name}
        </Text>
        <Text color="white" fontWeight="regular" letterSpacing="-0.01em">
          {location}
        </Text>
        {reviewsCount > 0 && (
          <>
            <Box mt="xs" mb="2px">
              <Star filled={rating >= 1} />
              <Star filled={rating >= 2} />
              <Star filled={rating >= 3} />
              <Star filled={rating >= 4} />
              <Star filled={rating >= 5} />
            </Box>
            <Text
              fontSize="xs"
              color="white"
              fontWeight="regular"
              letterSpacing="-0.01em"
            >
              {t("nouns.reviewCount", { count: reviewsCount })}
            </Text>
          </>
        )}
      </StyledImageContent>
    </StyledProfileImageWrapper>
  );
}

export default ProfileImage;
