import React, { Suspense } from "react";
import { useImage } from "react-image";
import styled from "styled-components";
import Loading from "@advisable-main/components/Loading";
import PostImages from "@guild/components/PostImages";
import { GuildBox } from "@guild/styles";

const StyledCoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`;

const Cover = ({ srcList }) => {
  const { src } = useImage({ srcList });
  return <StyledCoverImage src={src} />;
};

export const CoverImage = ({ images, cover }) => {
  return (
    <Suspense fallback={<Loading />}>
      <GuildBox position="relative" width="100%" display="inline-flex">
        <Cover srcList={cover} />
        {images && <PostImages images={images} />}
      </GuildBox>
    </Suspense>
  );
};
