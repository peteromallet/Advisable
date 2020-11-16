import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useImage } from "react-image";
import styled from "styled-components";
import Loading from "@advisable-main/components/Loading";
import PostImages from "@guild/components/PostImages";
import { Box } from "@advisable/donut";

const StyledCoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`;

const Cover = ({ srcList }) => {
  const src = useImage({ srcList });
  return <StyledCoverImage src={src} />;
};

export const CoverImage = ({ images, cover }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Box position="relative" width="100%" display="inline-flex">
        <ErrorBoundary FallbackComponent={() => null}>
          <Cover srcList={cover} />
        </ErrorBoundary>
        {images && <PostImages images={images} />}
      </Box>
    </Suspense>
  );
};
