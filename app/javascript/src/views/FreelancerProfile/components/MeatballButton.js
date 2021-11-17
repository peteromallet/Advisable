import React from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PopoverDisclosure } from "reakit/Popover";
import { DotsVertical } from "@styled-icons/heroicons-outline/DotsVertical";

export const StyledMeatballButton = styled(motion.div)(
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    bg: "rgba(255,255,255, 0.4)",
    color: "neutral700",
    borderRadius: "24px",
    transition: "0.2s opacity",
  }),
);

export default function MeatballButton({ popover }) {
  return (
    <PopoverDisclosure
      as={StyledMeatballButton}
      onHoverStart={popover.show}
      {...popover}
    >
      <DotsVertical size={24} />
    </PopoverDisclosure>
  );
}
