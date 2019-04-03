import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";
import {Icon as IconStyles} from "../../components/Icon/styles";

const Wrapper = styled.div`
  padding: 20px;
  color: #2b3169;
  font-size: 14px;
  line-height: 18px;
  border-radius: 8px;
  background: #fff3dc;
`;

const Title = styled.div`
  color: #e49600;
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;

  ${IconStyles} {
    margin-left: -4px;
  }
`;

export default ({ children }) => (
  <Wrapper>
    <Title>
      <Icon icon="message-circle" height={18} strokeWidth={2} />
      Comment from Advisable
    </Title>
    {children}
  </Wrapper>
);
