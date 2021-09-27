import React from "react";
import useLoadImage from "src/hooks/useLoadImage";
import possessive from "src/utilities/possesive";
import {
  StyledPassportAvatar,
  StyledPassportAvatarInner,
  StyledAvatarStroke,
  StyledAvatarImg,
} from "./styles";

function PassportAvatar({ src, name, size, stroke, color, ...props }) {
  const { isLoading, error } = useLoadImage(src);

  let initials = name[0];
  const nameSplit = name.split(" ");
  if (nameSplit.length > 1) {
    initials += nameSplit[1][0];
  }

  return (
    <StyledPassportAvatar
      $size={size}
      style={{ "--stroke": stroke }}
      {...props}
    >
      <svg className="svgClip" width="0" height="0" viewBox="0 0 126 144">
        <clipPath
          id="passportSquircle"
          clipPathUnits="objectBoundingBox"
          transform="scale(0.00793651 0.00694444)"
        >
          <path d="M61.92 0.5H64.08C76.2163 0.5 85.2824 0.500558 92.4194 1.19815C99.5487 1.89499 104.7 3.28357 109.022 6.02636C113.434 8.8264 117.174 12.566 119.974 16.9781C122.716 21.3001 124.105 26.4513 124.802 33.5806C125.499 40.7176 125.5 49.7837 125.5 61.92V82.08C125.5 94.2163 125.499 103.282 124.802 110.419C124.105 117.549 122.716 122.7 119.974 127.022C117.174 131.434 113.434 135.174 109.022 137.974C104.7 140.716 99.5487 142.105 92.4194 142.802C85.2824 143.499 76.2163 143.5 64.08 143.5H61.92C49.7837 143.5 40.7176 143.499 33.5806 142.802C26.4513 142.105 21.3001 140.716 16.9781 137.974C12.566 135.174 8.8264 131.434 6.02636 127.022C3.28357 122.7 1.89499 117.549 1.19815 110.419C0.500558 103.282 0.5 94.2163 0.5 82.08V61.92C0.5 49.7837 0.500558 40.7176 1.19815 33.5806C1.89499 26.4513 3.28357 21.3001 6.02636 16.9781C8.8264 12.566 12.566 8.8264 16.9781 6.02636C21.3001 3.28357 26.4513 1.89499 33.5806 1.19815C40.7176 0.500558 49.7837 0.5 61.92 0.5Z" />
        </clipPath>
      </svg>
      {stroke ? <StyledAvatarStroke /> : null}
      <StyledPassportAvatarInner color={color}>
        {initials}
      </StyledPassportAvatarInner>
      {src && !error ? (
        <StyledAvatarImg
          src={src}
          alt={`${possessive(name)} profile picture`}
          isLoading={isLoading}
        />
      ) : null}
    </StyledPassportAvatar>
  );
}

PassportAvatar.defaultProps = {
  size: "md",
  color: "blue",
};

export default PassportAvatar;
