import React from "react";
import { rgba } from "polished";
import { padding } from "styled-system";
import styled from "styled-components";
import { theme } from "@advisable/donut";

let Divider = styled.div`
  ${padding};

  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;

  &::before,
  &::after {
    height: 1px;
    width: 100%;
    content: "";
    background: ${rgba(theme.colors.neutral800, 0.1)};
  }
`;

const DividerText = styled.div`
  flex-shrink: 0;
  color: #4d536e;
  font-size: 16px;
  padding: 0 15px;
`;

export default ({
  children,
  padding,
  paddingTop,
  paddingLeft,
  paddingRight,
  paddingBottom,
  ...props
}) => {
  const paddingProps = {
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  };

  return (
    <Divider {...paddingProps} {...props}>
      {children && <DividerText>{children}</DividerText>}
    </Divider>
  );
};
