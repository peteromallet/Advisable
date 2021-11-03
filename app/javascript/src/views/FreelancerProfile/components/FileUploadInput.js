import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { Text, Box, Tooltip, theme } from "@advisable/donut";
import { position, variant } from "styled-system";
import { Camera } from "@styled-icons/feather/Camera";

const type = variant({
  prop: "$type",
  variants: {
    avatar: {
      position: "absolute",
      bottom: "16px",
      right: "-8px",
    },
    cover: {
      position: "absolute",
      bottom: "16px",
      right: "16px",
    },
  },
});

export const StyledButton = styled.div`
  ${type}
  ${position}

  width: 42px;
  height: 42px;
  display: flex;
  overflow: hidden;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: white;
  background: ${rgba(theme.colors.neutral200, 0.4)};
  backdrop-filter: blur(8px);
  border: 1px solid;
  border-color: ${theme.colors.neutral300};
  transition: background 0.2s, color 0.2s, opacity 0.2s;
  opacity: 0;

  &:hover {
    opacity: 1;
    color: ${rgba(theme.colors.blue100, 1)};
    background: ${rgba(theme.colors.neutral700, 0.6)};
  }
`;

export const StyledInput = styled.input`
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

export default function FileUploadInput({
  maxSizeInMB,
  accept,
  handleChange,
  type,
}) {
  const TooltipContent = (
    <Box>
      <Text color="blue100">Upload Photo</Text>
      <Text color="blue200" size="2xs">
        PNG or JPG | {maxSizeInMB} MB
      </Text>
    </Box>
  );
  return (
    <StyledButton $type={type}>
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
  );
}
