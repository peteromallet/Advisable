import React from "react";
import styled from "styled-components";
import useFileUpload from "../../hooks/useFileUpload";
import ProgressBar from "../ProgressBar";
import FileUploadInput from "../FileUploadInput";
import PictureActionArea from "../PictureActionArea";

export const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const FileUpload = ({ onChange, updated, maxSizeInMB = 2, type }) => {
  const accept = ".png, .jpg, .jpeg";
  const { handleChange, progress, uploading, processing } = useFileUpload({
    onChange,
    updated,
    maxSizeInMB,
    accept,
  });

  return (
    <StyledWrapper>
      <ProgressBar
        progress={progress}
        uploading={uploading}
        processing={processing}
        updated={updated}
        type={type}
      />
      <PictureActionArea type={type} />
      <FileUploadInput
        handleChange={handleChange}
        accept={accept}
        maxSizeInMB={maxSizeInMB}
        type={type}
      />
    </StyledWrapper>
  );
};

export default FileUpload;
