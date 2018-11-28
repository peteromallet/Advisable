import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 40px;
  text-align: center;
  border-radius: 4px;
  background: #E9ECF6;

  h4 {
    color: #00071F;
    margin-bottom: 10px;
  }

  a {
    color: #173FCD;
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
  }
`

export default ({ onRequestMoreTimes }) => (
  <Wrapper>
    <h4>There are no more times available</h4>
    <a href="#" onClick={onRequestMoreTimes}>
      Request more availability
    </a>
  </Wrapper>
)