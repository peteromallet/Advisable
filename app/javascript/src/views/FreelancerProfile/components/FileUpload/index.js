import React from "react";
import { Camera } from "@styled-icons/feather/Camera";
import { Box, Text, Tooltip } from "@advisable/donut";
import {
  StyledWrapper,
  StyledHoverArea,
  StyledInput,
  StyledButton,
  StyledProgressContainer,
  StyledProgressBar,
} from "./styles";
import useFileUpload from "./useFileUpload";
import { AnimatePresence, motion } from "framer-motion";

const FileUpload = ({ onChange, updated, maxSizeInMB = 2, type }) => {
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
    <StyledWrapper $type={type}>
      <AnimatePresence>
        {(uploading || processing || updated === false) && (
          <StyledProgressContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StyledProgressBar>
              <Box
                style={{ width: `${progress}%` }}
                height="100%"
                bg="blue500"
              />
            </StyledProgressBar>
            <Text fontSize="xxs" color="neutral800">
              {uploading && "Uploading"}
              {processing && "Processing"}
              {updated === false && "Displaying"}
            </Text>
          </StyledProgressContainer>
        )}
      </AnimatePresence>
      <StyledHoverArea />
      <StyledButton>
        <Tooltip
          placement={type === "avatar" ? "right" : "left"}
          content={TooltipContent}
        >
          <Box
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Camera size={20} strokeWidth={2} />
            <StyledInput type="file" accept={accept} onChange={handleChange} />
          </Box>
        </Tooltip>
      </StyledButton>
    </StyledWrapper>
  );
};

export default FileUpload;
