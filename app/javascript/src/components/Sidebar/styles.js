import styled from 'styled-components';

export const Sidebar = styled.div`
  width: 280px;
  height: 100vh;
  padding: 30px;
  background: #0570e6;
  box-sizing: border-box;

  @media screen and (max-width: 1000px) {
    width: 230px;
    padding: 20px;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const Logo = styled.img`
  margin-bottom: 30px;
`;
