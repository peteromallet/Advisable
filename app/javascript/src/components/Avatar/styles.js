import styled from "styled-components";

const sizes = {
  s: "30px",
  m: "60px",
  l: "100px"
};

export const Wrapper = styled.div`
  width: ${props => sizes[props.size || "m"]};
  height: ${props => sizes[props.size || "m"]};
  color: #0064FF;
  font-size: 20px;
  font-weight: 500;
  line-height: 60px;
  border-radius: 50%;
  text-align: center;
  display: inline-block;
  background-size: cover;
  background-position: center;
  background-color: rgba(0,100,255,0.10);
`;
