import styled from "styled-components";

export const PlayIcon = styled.div`
  left: 0;
  top: 50%;
  border-radius: 4px;
  position: absolute;
  background: #2c344e;
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  width: 26px;
  height: 20px;
  background: #2c344e;
  margin-top: -2px;
  box-shadow: 0px 2px 4px rgba(4, 14, 48, 0.07);
`;

export const VideoButton = styled.button`
  appearance: none;
  border: none;
  background: none;
  padding-left: 38px;
  position: relative;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  color: #4e5362;
  line-height: 18px;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #173fcd;

    ${PlayIcon} {
      background: #173fcd;
    }
  }
`;

export default VideoButton;
