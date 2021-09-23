import React from "react";
import useFileUpload from "../hooks/useFileUpload";
import { Box, Text, Tooltip } from "@advisable/donut";
import { Camera } from "@styled-icons/feather/Camera";
import styled from "styled-components";
import TransparentButton from "./TransparentButton";
import FileUploadProgressBar from "./FileUploadProgressBar";

const StyledInput = styled.input`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
`;

const Wrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & ${TransparentButton.Styled} {
    opacity: 0;
  }

  &:hover ${TransparentButton.Styled} {
    opacity: 1;
  }
`;

const FileUpload = ({ onChange, updated, maxSizeInMB = 2 }) => {
  const accept = ".png, .jpg, .jpeg";
  const { handleChange, progress, uploading, processing } = useFileUpload({
    onChange,
    updated,
    maxSizeInMB,
    accept,
  });

  const TooltipContent = (
    <Box>
      <Text color="blue100">Upload Photo</Text>
      <Text color="blue200" size="2xs">
        PNG or JPG | {maxSizeInMB} MB
      </Text>
    </Box>
  );

  return (
    <Wrapper>
      <FileUploadProgressBar
        progress={progress}
        uploading={uploading}
        processing={processing}
        updated={updated}
      />
      <TransparentButton position="absolute" bottom="16px" right="-8px">
        <Tooltip placement="right" content={TooltipContent}>
          <Box>
            <Camera size={20} strokeWidth={2} />
            <StyledInput type="file" accept={accept} onChange={handleChange} />
          </Box>
        </Tooltip>
      </TransparentButton>
    </Wrapper>
  );
};

export default FileUpload;
