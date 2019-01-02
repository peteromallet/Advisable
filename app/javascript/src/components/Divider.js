import React from 'react';
import { rgba } from "polished";
import styled from "styled-components";
import { withSpacing } from "./Spacing";

let Divider = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;

  &::before {
    height: 1px;
    width: 100%;
    content: "";
    background: ${rgba("#0A2248", 0.1)};
  }

  &::after {
    height: 1px;
    width: 100%;
    content: "";
    background: ${rgba("#0A2248", 0.1)};
  }
`;

Divider = withSpacing(Divider);

const DividerText = styled.div`
  flex-shrink: 0;
  color: #4d536e;
  font-size: 16px;
  padding: 0 15px;
`;

export default ({ children, ...props }) => {
  return (
    <Divider {...props}>
      {children && <DividerText>{children}</DividerText>}
    </Divider>
  );
};
