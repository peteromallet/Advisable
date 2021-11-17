import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "@advisable/donut";
import { PopoverDisclosure } from "reakit/Popover";
import { DotsVertical } from "@styled-icons/heroicons-outline/DotsVertical";

export const StyledMeatballButton = styled(motion.div)`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.4);
  color: ${theme.colors.neutral700};
  border-radius: 24px;
  transition: 0.2s opacity;
  @media (hover: none) {
    opacity: 1;
  }
`;

export default function MeatballButton({ popover }) {
  return (
    <PopoverDisclosure
      as={StyledMeatballButton}
      onHoverStart={popover.show}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        popover.visible ? popover.hide() : popover.show();
      }}
      {...popover}
    >
      <DotsVertical size={24} />
    </PopoverDisclosure>
  );
}
