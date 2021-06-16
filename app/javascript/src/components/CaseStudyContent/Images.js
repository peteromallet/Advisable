import React from "react";
import styled from "styled-components";
import { Box, theme } from "@advisable/donut";
import ImageGallery, { useImageGallery } from "src/components/ImageGallery";

const StyledImage = styled.div`
  cursor: pointer;
  height: 120px;
  max-width: 160px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-color: ${theme.colors.neutral100};
  border: 2px solid rgba(0, 0, 0, 0.12);
`;

function CaseStudyImages({ images }) {
  const dialog = useImageGallery();

  return (
    <Box paddingTop={2} paddingBottom={12}>
      <ImageGallery dialog={dialog} images={images} />

      <Box
        display="grid"
        gridGap="16px"
        gridTemplateColumns={{
          _: "1fr 1fr",
          s: "1fr 1fr 1fr",
          m: "1fr 1fr 1fr 1fr",
        }}
      >
        {images.map((image, index) => (
          <StyledImage
            key={image.id}
            onClick={() => dialog.open(index)}
            style={{ backgroundImage: `url("${image.url}")` }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default function CaseStudyImagesContainer(props) {
  if (props.images.length === 0) return null;
  return <CaseStudyImages {...props} />;
}
