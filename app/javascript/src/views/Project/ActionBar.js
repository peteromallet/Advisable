import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { rgba } from "polished";
import { theme } from "@advisable/donut";

const StyledActionBar = styled.div`
  bottom: 16px;
  position: fixed;
  padding: 12px;
  background: white;
  border-radius: 32px;
  box-shadow: 0 24px 64px ${rgba(theme.colors.neutral900, 0.24)},
    0 16px 40px -16px ${rgba(theme.colors.neutral900, 0.16)},
    0 4px 12px -4px ${rgba(theme.colors.neutral900, 0.16)};
`;

const StyledActionBarItem = styled.button`
  appearance: none;
  width: 80px;
  height: 72px;
  border: none;
  outline: none;
  cursor: pointer;
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  border-radius: 24px;

  svg {
    width: 30px;
    height: 30px;
    margin-bottom: 6px;
    color: ${theme.colors.blue900};
  }

  span {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.04em;
    color: ${theme.colors.neutral600};
  }

  &:hover {
    background: #eff0f3;
    color: ${theme.colors.blue700};

    svg {
      color: currentColor;
    }

    span {
      color: currentColor;
    }
  }
`;

function ActionBar({ children }) {
  const bar = React.useRef(null);

  const reposition = React.useCallback(() => {
    const offset = bar.current.parentNode.offsetLeft;
    const parentWidth = bar.current.parentNode.clientWidth;
    const width = bar.current.clientWidth;
    const left = offset + parentWidth / 2 - width / 2;
    bar.current.style.left = `${left}px`;
  }, [bar]);

  React.useEffect(() => {
    reposition();
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("resice", reposition);
    };
  }, [reposition]);

  return (
    <StyledActionBar
      as={motion.div}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      ref={bar}
    >
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          as: motion.div,
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.08 * i },
        }),
      )}
    </StyledActionBar>
  );
}

ActionBar.Item = function ActionBarItem({ icon, label, ...props }) {
  return (
    <StyledActionBarItem {...props}>
      {icon}
      <span>{label}</span>
    </StyledActionBarItem>
  );
};

export default ActionBar;
