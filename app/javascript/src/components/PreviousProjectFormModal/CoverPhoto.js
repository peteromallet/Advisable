import { find } from "lodash-es";
import { Box, Text } from "@advisable/donut";
import React from "react";
import { StyledCoverPhoto, StyledCoverPhotoTag } from "./styles";

function CoverPhoto({ images, dispatch }) {
  const cover = find(images, { cover: true });
  const [background, setBackground] = React.useState(cover?.url);

  React.useEffect(() => {
    if (cover?.uploading) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setBackground(e.target.result);
      };

      reader.readAsDataURL(cover.file);
    } else {
      setBackground(cover?.url);
    }
  }, [cover]);

  const handleChange = (e) => {
    Array.from(e.target.files).forEach((file, i) => {
      dispatch({
        type: "NEW_UPLOAD",
        file,
        cover: !cover && i === 0,
        position: i + 1,
      });
    });
  };

  return (
    <StyledCoverPhoto coverImage={background}>
      {cover && <StyledCoverPhotoTag>Cover Photo</StyledCoverPhotoTag>}
      {!cover && (
        <Box>
          <input
            type="file"
            name="upload-image"
            onChange={handleChange}
            multiple
          />
          <Text color="blue900" mb="xxs" className="title">
            Add images to this project
          </Text>
          <Text fontSize="s" color="neutral500" className="subtext">
            Upload images to support this project
          </Text>
        </Box>
      )}
    </StyledCoverPhoto>
  );
}

export default CoverPhoto;
