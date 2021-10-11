import React from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import { Box, theme } from "@advisable/donut";
import ImageGallery, { useImageGallery } from "src/components/ImageGallery";

const StyledImage = styled.img`
  cursor: pointer;
  width: 100%;
  height: 120px;
  max-width: 200px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-color: ${theme.colors.neutral100};
  border: 2px solid transparent;
  &:hover {
    border-color: ${theme.colors.neutral200};
  }
`;

const ONE = css({
  [StyledImage]: {
    maxWidth: "100%",
    width: "100%",
    height: "auto",
  },
});

const TWO = css({
  gridTemplateColumns: "1fr 1fr",
  [StyledImage]: {
    maxWidth: "100%",
    width: "100%",
    height: "auto",
  },
});

const THREE = css({
  gridTemplateColumns: "repeat(2, 1fr)",
  [StyledImage]: {
    maxWidth: "100%",
    width: "100%",
    height: "auto",

    "&:first-child": {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
});

const GRID = css({
  gridTemplateColumns: ["1fr 1fr", "1fr 1fr 1fr 1fr"],
  [StyledImage]: {
    height: "120px",
    maxWidth: "200px",
  },
});

const STYLES = [ONE, TWO, THREE, TWO];

const StyledImages = styled.div`
  display: grid;
  grid-gap: 12px;

  ${(p) => STYLES[p.number] || GRID};
`;

function CaseStudyImages({ images }) {
  const dialog = useImageGallery();

  return (
    <Box paddingTop={2} paddingBottom={12}>
      <ImageGallery dialog={dialog} images={images} />

      <StyledImages number={images.length - 1}>
        {images.map((image, index) => (
          <StyledImage
            key={image.id}
            onClick={() => dialog.open(index)}
            src={image.url}
            // style={{ backgroundImage: `url("${image.url}")` }}
          />
        ))}
      </StyledImages>
    </Box>
  );
}

export default function CaseStudyImagesContainer(props) {
  if (props.images.length === 0) return null;
  return <CaseStudyImages {...props} />;
}
