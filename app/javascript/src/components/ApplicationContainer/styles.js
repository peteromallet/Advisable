import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  @media screen and (max-width: 700px) {
    display: block;
  }
`;

export const View = styled.div`
  flex: 1;
  padding: 0 30px;
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  transition: transform 300ms ease-out;
  transform: ${props =>
    props.drawerOpen ? `translateX(80%)` : `translateX(0)`};

  @media screen and (max-width: 700px) {
    max-height: none;
    overflow-y: auto;
    padding: 60px 20px 0 20px;
  }
`
