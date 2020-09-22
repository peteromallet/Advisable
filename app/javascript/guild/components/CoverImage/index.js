import React, { Suspense } from "react";
import { useImage } from "react-image";
import styled from "styled-components";
import Loading from "@advisable-main/components/Loading";

const StyledCoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`;

const Image = ({ srcList }) => {
  const { src } = useImage({ srcList });
  return <StyledCoverImage src={src} />;
};

/* TODO: Skeleton */
export const CoverImage = ({ src }) => (
  <Suspense fallback={<Loading />}>
    <Image srcList={src} />
  </Suspense>
);
