import React, { useState } from "react";
import { Box, Text, Tooltip, theme } from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import { rgba } from "polished";
import { DirectUpload } from "@rails/activestorage";
import { Camera } from "@styled-icons/feather/Camera";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import filesExceedLimit from "src/utilities/filesExceedLimit";
import matchFileType from "src/utilities/matchFileType";

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads";

const Wrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const animation = keyframes`
  from {
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(3px);
  }

  to {
    backdrop-filter: blur(4px);
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const BluredBackground = styled(Box)`
  animation: ${animation} 0.8s ease infinite alternate;
`;

const ProgressBar = styled(Box)`
  height: 2px;
  width: 180px;
  max-width: 60%;
  overflow: hidden;
  border-radius: 1px;
  background: ${theme.colors.blue100};
  box-shadow: 0 0 1px 0 ${rgba(theme.colors.neutral900, 0.3)};
`;

const FileUploader = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  overflow: hidden;
  position: absolute;
  bottom: 12px;
  right: 12px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral700};
  background: ${rgba(theme.colors.neutral200, 0.4)};
  transition: background 0.2s, color 0.2s, opacity 0.2s;
  opacity: 0;

  &:hover {
    color: ${theme.colors.neutral800};
    background: ${rgba(theme.colors.neutral200, 0.7)};
  }
  ${Wrapper}:hover & {
    opacity: 1;
  }

  input {
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
  }
`;

const FileUpload = ({ onChange, updated, maxSizeInMB = 2 }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const { error } = useNotifications();
  const accept = ".png, .jpg, .jpeg";

  const progressHandler = {
    directUploadWillStoreFileWithXHR(request) {
      request.upload.addEventListener("progress", (e) => {
        const p = Math.round((100 * e.loaded) / e.total);
        setUploadProgress(p);
      });
    },
  };

  const upload = (file) => {
    const u = new DirectUpload(file, DIRECT_UPLOAD_URL, progressHandler);

    u.create(async (error, blob) => {
      if (error) {
        console.error(error);
      } else {
        setProcessing(true);
        setUploading(false);
        setUploadProgress(0);
        await onChange(blob);
        setProcessing(false);
      }
    });
  };

  const handleChange = (e) => {
    if (!e.target?.value) return false;
    const files = Array.from(e.target.files);

    // Check file type
    if (!matchFileType(files, accept)) {
      error(`Please select one of the following file types: ${accept}`);
      return false;
    }
    // Check file size
    if (filesExceedLimit(files, maxSizeInMB)) {
      error(`File size cannot exceed ${maxSizeInMB} MB`);
      return false;
    }

    setUploading(true);
    files.forEach((file) => upload(file));
  };

  const progress =
    (uploadProgress / 100) * 80 ||
    (processing && 90) ||
    (updated === false && 100) ||
    0;

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
      <AnimatePresence>
        {(uploading || processing || updated === false) && (
          <BluredBackground
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
            height="100%"
            position="absolute"
            css={``}
          >
            <ProgressBar mt="s" mb="xs">
              <Box
                style={{ width: `${progress}%` }}
                height="100%"
                bg="blue500"
              />
            </ProgressBar>
            <Text fontSize="xxs" color="neutral800">
              {uploading && "Uploading"}
              {processing && "Processing"}
              {updated === false && "Displaying"}
            </Text>
          </BluredBackground>
        )}
      </AnimatePresence>
      <Tooltip placement="top" content={TooltipContent}>
        <FileUploader>
          <Camera size={20} strokeWidth={2} />
          <input type="file" accept={accept} onChange={handleChange} />
        </FileUploader>
      </Tooltip>
    </Wrapper>
  );
};

export default FileUpload;
