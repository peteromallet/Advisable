import styled from "styled-components";

export const Container = styled.div.attrs(props => ({
  style: {
    height: `${props.height}px`,
  },
}))`
  width: 100%;
  height: 100%;
  background: white;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
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
