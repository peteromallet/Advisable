import React, { Suspense } from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import SuperEllipse from "react-superellipse";
import { Circle, theme } from "@advisable/donut";
import { useImage } from "react-image";
import { ErrorBoundary } from "react-error-boundary";
import { variant } from "styled-system";

const StyledRecommendationAvatarSquircle = styled(SuperEllipse)(
  css({
    width: "100%",
    height: "100%",
    bg: "neutral100",
    svg: {
      width: "100%",
    },
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

const StyledRecommendationNumber = styled(Circle)(
  css({
    size: "48px",
    position: "absolute",
    top: "12px",
    left: "12px",
    zIndex: 2,
    fontSize: "20px",
    fontWeight: "600",
    color: "blue800",
    boxShadow: "s",
  }),
);

export const size = variant({
  prop: "$size",
  variants: {
    lg: {
      width: "190px",
      height: "220px",
      [StyledRecommendationAvatarName]: {
        fontSize: "28px",
        lineHeight: "28px",
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
    sm: {
      width: "140px",
      height: "162px",
      [StyledRecommendationAvatarName]: {
        fontSize: "18px",
        lineHeight: "20px",
      },
    },
    xs: {
      width: "120px",
      height: "140px",
      [StyledRecommendationNumber]: {
        size: "36px",
        fontSize: "18px",
      },
      [StyledRecommendationAvatarOverlay]: {
        padding: 4,
      },
      [StyledRecommendationAvatarName]: {
        fontSize: "18px",
        lineHeight: "20px",
        fontWeight: 550,
      },
    },
    "2xs": {
      width: "80px",
      height: "92px",
      [StyledRecommendationNumber]: {
        size: "24px",
        fontSize: "12px",
      },
      [StyledRecommendationAvatarOverlay]: {
        padding: 2,
      },
      [StyledRecommendationAvatarName]: {
        fontSize: "14px",
        lineHeight: "16px",
        fontWeight: 550,
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

  return <StyledRecommendationAvatarImage src={image.src} />;
}

export default function RecommendationAvatar({
  number,
  src,
  name,
  size = "lg",
}) {
  return (
    <StyledRecommendationAvatar $size={size}>
      {number ? (
        <StyledRecommendationNumber bg="white">
          {number}
        </StyledRecommendationNumber>
      ) : null}

      <StyledRecommendationAvatarSquircle r1={0.02} r2={0.4}>
        {name && (
          <StyledRecommendationAvatarOverlay>
            <StyledRecommendationAvatarName>
              {name}
            </StyledRecommendationAvatarName>
          </StyledRecommendationAvatarOverlay>
        )}
        {src && (
          <Suspense fallback={null}>
            <ErrorBoundary fallback={<></>}>
              <AvatarImage src={src} />
            </ErrorBoundary>
          </Suspense>
        )}

        <svg viewBox="0 0 180 220">
          <g fill={theme.colors.neutral50}>
            <circle cx="90" cy="90" r="40"></circle>
            <circle cx="90" cy="234" r="90"></circle>
          </g>
        </svg>
      </StyledRecommendationAvatarSquircle>
    </StyledRecommendationAvatar>
  );
}
