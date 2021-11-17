import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { DialogDisclosure, theme } from "@advisable/donut";

export const StyledDropdownLink = styled(motion.div)`
  display: block;
  font-size: 16px;
  cursor: pointer;
  font-weight: 450;
  padding: 12px 20px;
  color: ${theme.colors.neutral600};

  &:hover {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral50};
  }
`;

export default function EditCaseStudyDropdownLink({ modal, popover }) {
  return (
    <DialogDisclosure
      as={StyledDropdownLink}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        modal.show();
        popover.hide();
      }}
      {...modal}
    >
      Open Editor
    </DialogDisclosure>
  );
}
