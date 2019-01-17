import styled from 'styled-components';

export const StarRating = styled.div`
  position: relative;
  display: inline-block;
  padding-left: ${props => props.showNumber && "26px"};
`

export const Star = styled.div`
  display: inline-block;

  svg {
    display: block;  
  }
`

export const Number = styled.div`
  left: 0;
  top: 50%;
  color: #FF9900;
  font-size: 16px;
  font-weight: 600;
  margin-right: 4px;
  position: absolute;
  transform: translateY(-50%);
`