import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  max-width: 700px;
  padding: 50px 0;
`

export const Deliverable = styled.div`
  color: #2E3657;
  font-size: 15px;
  line-height: 22px;
  position: relative;
  background: #F4F7FC;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 12px 15px 12px 45px;

  &::before {
    top: 50%;
    left: 20px;
    content: "";
    width: 8px;
    height: 8px;
    position: absolute;
    background: #becce3;
    border-radius: 100%;
    transform: translateY(-50%);
  }
`
