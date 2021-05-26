import React from "react";
import find from "lodash/find";
import { Box, Text } from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import { StyledCoverPhoto, StyledCoverPhotoTag } from "./styles";
import filesExceedLimit from "src/utilities/filesExceedLimit";
import matchFileType from "src/utilities/matchFileType";

function CoverPhoto({ images, dispatch, resourceName = "project" }) {
  const cover = find(images, { cover: true });
  const [background, setBackground] = React.useState(cover?.url);
  const { error } = useNotifications();
  const MAX_SIZE_IN_MB = 5;
  const accept = ".png, .jpg, .jpeg";

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

    // Check file type
    if (!matchFileType(files, accept)) {
      error(`Please select one of the following file types: ${accept}`);
      return false;
    }
    // Check file size
    if (filesExceedLimit(files, MAX_SIZE_IN_MB)) {
      error(`File size cannot exceed ${MAX_SIZE_IN_MB} MB`);
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
            accept={accept}
            onChange={handleChange}
            multiple
          />
          <Text color="blue900" mb={1.5} className="title">
            Add images to this {resourceName}
          </Text>

          <Text fontSize="xs" color="neutral500" className="subtext">
            PNG or JPG files | {MAX_SIZE_IN_MB} MB each
          </Text>
        </Box>
      )}
    </StyledCoverPhoto>
  );
}

export default CoverPhoto;
