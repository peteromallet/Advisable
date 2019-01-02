import styled from "styled-components";

export const Form = styled.form.attrs({
  style: props => ({
    height: `${props.height}px`
  })
})`
  width: 100%;
  height: 100%;
  display: flex;
  background: white;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: 30px;
`;

export const Body = styled.div`
  flex: 1% 1 0;
  overflow-y: scroll;
`;

export const Footer = styled.div`
  padding: 25px;
`;
