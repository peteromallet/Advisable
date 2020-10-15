import React, { useState } from "react";
import { Box, Text, theme } from "@advisable/donut";
import { rgba } from "polished";
import { DirectUpload } from "@rails/activestorage";
import { Camera } from "@styled-icons/feather";
import { AnimatePresence, motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

const DIRECT_UPLOAD_URL = "/rails/active_storage/direct_uploads";

const Wrapper = styled(Box)`
  position: absolute;
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
  /* background-color: rgba(255, 255, 255, 0.3); */
  /* backdrop-filter: blur(10px); */
  animation: ${animation} 0.8s ease infinite alternate;
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
  background: ${rgba(theme.colors.neutral100, 0.5)};
  transition: background 0.2s, color 0.2s, opacity 0.2s;
  opacity: 0;

  &:hover {
    color: ${theme.colors.neutral800};
    background: ${rgba(theme.colors.neutral100, 0.7)};
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

const FileUpload = ({ onChange, updated }) => {
  const [file, setFile] = React.useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);

  const progressHandler = {
    directUploadWillStoreFileWithXHR(request) {
      request.upload.addEventListener("progress", (e) => {
        const p = Math.round((100 * e.loaded) / e.total);
        setUploadProgress(p);
      });
    },
  };

  const upload = (file) => {
    setFile(file);
    const u = new DirectUpload(file, DIRECT_UPLOAD_URL, progressHandler);

    u.create(async (error, blob) => {
      if (error) {
        console.log("error", error);
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
    setUploading(true);
    Array.from(e.target.files).forEach((file) => upload(file));
  };

  const progress =
    (uploadProgress / 100) * 80 ||
    (processing && 90) ||
    (updated === false && 100) ||
    0;

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
            <Box
              bg={theme.colors.blue100}
              width="180px"
              maxWidth="60%"
              height="2px"
              borderRadius="1px"
              overflow="hidden"
              mt="s"
              mb="xs"
            >
              <Box width={`${progress}%`} height="100%" bg="blue500" />
            </Box>
            {/* <Box as={motion.svg} width="48px" height="48px" viewBox="0 0 50 50">
              <motion.path
                d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ rotate: 90, scaleX: -1, translateX: 5, translateY: 5 }}
                stroke={theme.colors.blue100}
                fill="transparent"
                strokeWidth="3px"
              />
              <motion.path
                d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: progress / 100, opacity: 1 }}
                style={{ rotate: 90, scaleX: -1, translateX: 5, translateY: 5 }}
                stroke={theme.colors.blue500}
                fill="transparent"
                strokeWidth="3px"
              />
            </Box> */}
            <Text fontSize="xxs" color="neutral800">
              {uploading && "Uploading"}
              {processing && "Processing"}
              {updated === false && "Displaying"}
            </Text>
          </BluredBackground>
        )}
      </AnimatePresence>
      <FileUploader>
        <Camera size={20} strokeWidth={2} />
        <input type="file" onChange={handleChange} />
      </FileUploader>
    </Wrapper>
  );
};

export default FileUpload;
