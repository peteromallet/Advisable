import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 30px;
  color: #684C00;
  font-size: 15px;
  line-height: 22px;
  font-style: italic;
  border-radius: 3px;
  margin-bottom: 30px;
  border: 1px solid #FFC72D;
  background: rgba(255,199,45,0.06);
`

const Title = styled.div`
  color: #FFB500;
  font-weight: 500;
  letter-spacing: -0.04em;
`

export default ({ children }) => (
  <Wrapper>
    <Title>Message from Advisable</Title>
    {children}
  </Wrapper>
)
