import styled from 'styled-components';

export const Nav = styled.nav`
  width: 280px;
  height: 100vh;
  padding: 30px;
  background: #0570E6;
  box-sizing: border-box;
`

export const StatusList = styled.div`
  margin-top: 30px;

  a {
    width: 100%;
    height: 36px;
    color: #B4D3F5;
    display: block;
    line-height: 38px;
    font-size: 16px;
    padding: 0 10px;
    font-weight: 600;
    position: relative;
    border-radius: 5px;
    padding-left: 40px;
    margin-bottom: 10px;
    align-items: center;
    text-decoration: none;

    .Icon {
      top: 50%;
      left: 8px;
      position: absolute;
      transform: translateY(-50%);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }

    &.active {
      color: white;
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`
