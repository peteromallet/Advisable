import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useImage } from "react-image";
import styled from "styled-components";
import { Box, Skeleton } from "@advisable/donut";

const StyledCoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Cover = ({ srcList }) => {
  const { src } = useImage({ srcList });
  return <StyledCoverImage src={src} />;
};

export const CoverImage = ({ height = "320px", cover, onClick, ...props }) => {
  return (
    <Suspense
      fallback={<Skeleton height={height} width="100%" borderRadius="4px" />}
    >
      <Box
        width="100%"
        height={height}
        position="relative"
        display="flex"
        onClick={onClick}
        overflow="hidden"
        {...props}
      >
        <ErrorBoundary FallbackComponent={() => null}>
          <Cover srcList={cover} />
        </ErrorBoundary>
      </Box>
    </Suspense>
  );
};
