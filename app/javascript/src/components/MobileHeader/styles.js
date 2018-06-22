import styled from 'styled-components';

export const Header = styled.div`
  top: 0;
  left: 0;
  z-index: 2;
  padding: 0;
  width: 100%;
  height: 60px;
  position: fixed;
  background: #0064FF;
  box-shadow: 0 1px 4px 0 rgba(0, 113, 233, 0.22);

  display: none;
  @media screen and (max-width: 700px) {
    display: block;
  }

  transition: transform 300ms ease-out;
  transform: ${props =>
    props.drawerOpen ? `translateX(80%)` : `translateX(0)`};
`

export const Logo = styled.img`
  top: 16px;
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
`;


export const Hamburger = styled.div`
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  display: none;
  padding-top: 22px;
  padding-left: 18px;
  position: absolute;

  @media screen and (max-width: 700px) {
    display: block;
  }
`;

export const HamburgerLine = styled.div`
  width: 22px;
  height: 2px;
  top: 20px;
  left: 15px;
  background: white;
  border-radius: 2px;
  margin-bottom: 5px;
`;
