import React, { Suspense } from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import SuperEllipse from "react-superellipse";
import { Circle } from "@advisable/donut";
import { useImage } from "react-image";
import { ErrorBoundary } from "react-error-boundary";
import { variant } from "styled-system";

const StyledRecommendationAvatarSquircle = styled(SuperEllipse)(
  css({
    width: "100%",
    height: "100%",
    bg: "blue100",
  }),
);

const StyledRecommendationAvatarOverlay = styled.div({
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  padding: "20px",
  position: "absolute",
  display: "flex",
  alignItems: "flex-end",
  background:
    "linear-gradient(180deg, rgba(21, 20, 20, 0) 46%, rgba(21, 20, 20, 0.6) 100%)",
});

const StyledRecommendationAvatarName = styled.h4(
  css({
    color: "white",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    textShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
  }),
);

const StyledRecommendationAvatarImage = styled.img(
  css({
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }),
);

const size = variant({
  prop: "$size",
  variants: {
    lg: {
      width: "190px",
      height: "220px",
      [StyledRecommendationAvatarName]: {
        fontSize: "26px",
        lineHeight: "26px",
      },
    },
    md: {
      width: "170px",
      height: "198px",
      [StyledRecommendationAvatarName]: {
        fontSize: "24px",
        lineHeight: "24px",
      },
    },
  },
});

const StyledRecommendationAvatar = styled.div(
  size,
  css({
    position: "relative",
  }),
);

function AvatarImage({ src }) {
  const image = useImage({ srcList: [src] });

  return (
    <ErrorBoundary fallback={null}>
      <StyledRecommendationAvatarImage src={image.src} />
    </ErrorBoundary>
  );
}

export default function RecommendationAvatar({
  number,
  specialist,
  size = "lg",
}) {
  return (
    <StyledRecommendationAvatar $size={size}>
      <Circle
        size="48px"
        bg="white"
        position="absolute"
        top="12px"
        left="12px"
        zIndex={2}
        fontSize="20px"
        fontWeight="600"
        color="blue700"
        boxShadow="s"
      >
        {number}
      </Circle>
      <StyledRecommendationAvatarSquircle r1={0.02} r2={0.4}>
        <StyledRecommendationAvatarOverlay>
          <StyledRecommendationAvatarName>
            {specialist.name}
          </StyledRecommendationAvatarName>
        </StyledRecommendationAvatarOverlay>
        {specialist.avatar && (
          <Suspense fallback={null}>
            <AvatarImage src={specialist.avatar} />
          </Suspense>
        )}

        <svg width="180" height="220" viewBox="0 0 180 220">
          <g fill="#EAF1FF" clipPath="url(#clip0)">
            <circle cx="90" cy="90" r="40"></circle>
            <circle cx="90" cy="234" r="90"></circle>
          </g>
          <defs>
            <clipPath id="clip0">
              <path fill="#fff" d="M0 0H180V220H0z"></path>
            </clipPath>
          </defs>
        </svg>
      </StyledRecommendationAvatarSquircle>
    </StyledRecommendationAvatar>
  );
}
