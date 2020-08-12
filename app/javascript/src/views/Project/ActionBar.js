import React from "react";
import styled from "styled-components";

const StyledActionBar = styled.div`
  left: 50%;
  bottom: 24px;
  padding: 12px;
  position: fixed;
  background: white;
  border-radius: 32px;
  transform: translateX(calc(-50%));
  box-shadow: 0px 4px 8px rgba(95, 95, 117, 0.08),
    0px 1px 60px rgba(14, 31, 91, 0.16);
`;

const StyledActionBarItem = styled.button`
  appearance: none;
  width: 80px;
  height: 64px;
  border: none;
  outline: none;
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  border-radius: 24px;

  &:hover {
    background: #eff0f3;
  }

  svg {
    width: 28px;
    height: 28px;
    stroke-width: 2;
    margin-bottom: 4px;
  }
`;

function ActionBar({ children }) {
  const bar = React.useRef(null);

  const reposition = React.useCallback(() => {
    const offset = bar.current.parentNode.offsetLeft;
    const width = bar.current.parentNode.clientWidth;
    const left = offset + width / 2;
    bar.current.style.left = `${left}px`;
  }, [bar]);

  React.useEffect(() => {
    reposition();
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("resice", reposition);
    };
  }, [reposition]);

  return <StyledActionBar ref={bar}>{children}</StyledActionBar>;
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
