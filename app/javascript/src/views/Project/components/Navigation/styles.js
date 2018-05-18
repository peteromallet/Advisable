import styled, { keyframes } from 'styled-components';

const load = keyframes`
  0% { opacity: 1 }
  50% { opacity: 0.4 }
  99% { opacity: 1 }
`;


export const LoadingItem = styled.div`
  width: 100%;
  height: 36px;
  border-radius: 4px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, .15);
  animation: ${load} 2s linear infinite;
`

export const Count = styled.div`
  top: 50%;
  right: 10px;
  height: 20px;
  color: #9DC4EF;
  padding: 0 15px;
  font-size: 12px;
  font-weight: 600;
  line-height: 22px;
  position: absolute;
  border-radius: 10px;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, .15);
`

export const Nav = styled.nav`
  width: 280px;
  height: 100vh;
  padding: 30px;
  background: #0570E6;
  box-sizing: border-box;

  @media screen and (max-width: 1000px) {
    width: 200px;
  }

  @media screen and (max-width: 920px) {
    width: 80px;
    padding: 20px;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
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

      ${Count} {
        color: white;
      }
    }
  }
`
