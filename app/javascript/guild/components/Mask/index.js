import React from "react";
import styled, { css } from "styled-components";

const Mask = ({ isOpen, toggler, header = true }) => {
  const handleToggleMask = () => toggler && toggler();

  return (
    <StyledMask open={isOpen} header={header} onClick={handleToggleMask} />
  );
};

const StyledMask = styled.div`
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: ${({ header }) => (header ? "58px" : 0)};
  transition: visibility 0s, opacity 0.3s linear;
  z-index: 2;
  ${({ open }) => css`
    opacity: ${open ? 1 : 0};
    visibility: ${open ? "visible" : "hidden"};
  `}
`;

export default Mask;
