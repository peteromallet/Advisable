import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { rgba } from "polished";
import { variant } from "styled-system";
import { theme } from "@advisable/donut";

const StyledActionBar = styled.div`
  left: 50%;
  bottom: 16px;
  height: 100px;
  display: flex;
  position: fixed;
  padding: 0 20px;
  border-radius: 40px;
  align-items: center;
  transform: translate(-50%);
  background: rgba(255, 255, 255, 0.96);

  box-shadow: 0px 4px 12px ${rgba(theme.colors.neutral900, 0.04)},
    0px 12px 24px ${rgba(theme.colors.neutral900, 0.08)},
    0px 24px 64px ${rgba(theme.colors.neutral900, 0.16)};
`;

const StyledActionBarItemIcon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  position: relative;
  margin-bottom: 6px;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.blue900};

  &::before {
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-radius: 50%;
    position: absolute;
    background: #e6e6ec;
    transition: transform 200ms;
  }

  svg {
    z-index: 2;
    width: 24px;
    height: 24px;
    color: currentColor;
  }
`;

const StyledActionBarItem = styled.button`
  appearance: none;
  width: 100px;
  padding: 0;
  height: 72px;
  border: none;
  outline: none;
  color: #4c5061;
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.01em;
  position: relative;

  &::before {
    top: 12px;
    left: -1px;
    content: "";
    height: 48px;
    width: 1px;
    position: absolute;
    background: ${theme.colors.neutral200};
  }

  &:first-child::before {
    display: none;
  }

  &:not(:disabled):hover {
    color: ${theme.colors.blue700};

    ${StyledActionBarItemIcon} {
      color: ${theme.colors.blue600};
    }

    ${StyledActionBarItemIcon}::before {
      transform: scale(1.12);
    }
  }

  &[disabled] {
    opacity: 0.5;
  }

  ${variant({
    variants: {
      primary: {
        color: "#001988",
        [StyledActionBarItemIcon]: {
          "::before": {
            background: "#DEE4FC",
          },
        },
      },
    },
  })}
`;

function ActionBar({ children }) {
  return (
    <StyledActionBar
      as={motion.div}
      initial={{ y: 50, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </StyledActionBar>
  );
}

ActionBar.Item = React.forwardRef(function ActionBarItem(
  { icon, label, variant, ...props },
  ref,
) {
  return (
    <StyledActionBarItem
      aria-label={label}
      variant={variant}
      ref={ref}
      {...props}
    >
      <StyledActionBarItemIcon>{icon}</StyledActionBarItemIcon>
      <span>{label}</span>
    </StyledActionBarItem>
  );
});

export default ActionBar;
