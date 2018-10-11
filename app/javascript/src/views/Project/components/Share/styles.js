import styled, { keyframes } from "styled-components";
import icons from "./icons.svg";

export const ShareWrapper = styled.div`
  text-align: center;
  padding: 40px;

  h4 {
    color: #001c49;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 15px;
    letter-spacing: -0.01em;
  }
`;

const serviceColours = {
  linkedin: "#0077B5",
  facebook: "#3B5998",
  twitter: "#1DA1F2"
};

const iconPositons = {
  linkedin: "0 0",
  facebook: "-38px 0",
  twitter: "-76px 0",
  email: "-114px 0"
};

export const ShareIcon = styled.div`
  width: 38px;
  height: 38px;
  margin: 0 5px;
  cursor: pointer;
  position: relative;
  display: inline-block;

  &::before {
    top: 0;
    left: 0;
    z-index: 0;
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    transform: scale(1);
    transition: transform 300ms cubic-bezier(0.3, 0, 0, 1);
    background: ${props => serviceColours[props["data-service"]] || "#8F8EB9"};
  }

  &::after {
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url(${icons});
    background-position: ${props => iconPositons[props["data-service"]]};
  }

  &:hover::before {
    transform: scale(1.2);
  }
`;

const copiedAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  25%, 75% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-15px);
  }
`

export const URL = styled.div`
  height: 36px;
  margin: 0 auto;
  max-width: 500px;
  margin-top: 25px;
  position: relative;
  background: #f5f7ff;
  border-radius: 30px;

  &::after {
    top: 0;
    right: 0;
    z-index: 1;
    content: "";
    height: 100%;
    width: 110px;
    position: absolute;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background: linear-gradient(
      270deg,
      #f5f7ff 70%,
      rgba(245, 247, 255, 0) 100%
    );
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
    color: #1e3458;
    font-size: 14px;
    padding: 0 30px;
    font-weight: 500;
    appearance: none;
    letter-spacing: -0.01em;
    background: transparent;
  }

  button {
    top: 6px;
    z-index: 2;
    right: 6px;
    border: none;
    height: 24px;
    cursor: pointer;
    color: #173fcd;
    font-size: 11px;
    padding: 0 15px;
    font-weight: 600;
    appearance: none;
    line-height: 24px;
    background: white;
    position: absolute;
    border-radius: 20px;
    text-transform: uppercase;
    box-shadow: 0px 2px 8px rgba(0, 20, 90, 0.08);
  }

  .copiedToClipboard {
    right: 0;
    top: -20px;
    color: #173fcd;
    font-size: 14px;
    position: absolute;
    animation: ${copiedAnimation} 1.5s cubic-bezier(0.3, 0, 0, 1) forwards;
  }
`;

export const Divider = styled.div`
  display: flex;
  color: #a3a8ba;
  margin: 30px 0;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  position: relative;
  text-align: center;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.01em;
  text-transform: uppercase;

  &::before {
    content: "";
    height: 1px;
    width: 100px;
    margin-right: 10px;
    background: #d8dbe9;
  }

  &::after {
    content: "";
    height: 1px;
    width: 100px;
    margin-left: 10px;
    background: #d8dbe9;
  }
`;

export const ShareButton = styled.button`
  height: 32px;
  margin: 0 5px;
  color: #50506D;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
  font-weight: 600;
  appearance: none;
  line-height: 30px;
  border-radius: 4px;
  background: #ffffff;
  display: inline-block;
  letter-spacing: -0.01em;
  border: 1px solid #c9c8db;

  img {
    transform: translateY(25%);
    margin-right: 10px;
  }

  &:hover {
    color: #001C49;
  }
`;
