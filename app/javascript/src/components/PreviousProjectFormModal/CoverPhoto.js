import React from "react";
import { find } from "lodash-es";
import { Box, Text } from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import { StyledCoverPhoto, StyledCoverPhotoTag } from "./styles";

function CoverPhoto({ images, dispatch, resourceName = "project" }) {
  const cover = find(images, { cover: true });
  const [background, setBackground] = React.useState(cover?.url);
  const { error } = useNotifications();

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
    if (!e.target?.value) return false;
    const files = Array.from(e.target.files);

    // Check file size
    const MAX_SIZE_IN_MB = 3;
    const maxSizeInBytes = MAX_SIZE_IN_MB * 1048576;
    const isExceededSize = files.some(({ size }) => size > maxSizeInBytes);
    if (isExceededSize) {
      error(
        files.length > 1
          ? `The size of some file is more than ${MAX_SIZE_IN_MB} MB`
          : `The size of the file is more than ${MAX_SIZE_IN_MB} MB`,
      );
      return false;
    }

    files.forEach((file, i) => {
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
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            multiple
          />
          <Text color="blue900" mb="xxs" className="title">
            Add images to this {resourceName}
          </Text>
          <Text fontSize="s" color="neutral500" className="subtext">
            Upload images to support this {resourceName}
          </Text>
        </Box>
      )}
    </StyledCoverPhoto>
  );
}

export default CoverPhoto;
