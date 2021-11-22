import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { DialogDisclosure, theme } from "@advisable/donut";

export const StyledDropdownLink = styled(motion.button)`
  display: block;
  font-size: 16px;
  cursor: pointer;
  font-weight: 450;
  padding: 12px 20px;
  appearance: none;
  border: none;
  background: transparent;
  font-family: TThoves, sans-serif;
  color: ${theme.colors.neutral600};

  &:hover {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral50};
  }
`;

export default function EditCaseStudyDropdownLink({ modal }) {
  return (
    <DialogDisclosure
      as={StyledDropdownLink}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        modal.show();
      }}
    >
      Edit case study
    </DialogDisclosure>
  );
}
