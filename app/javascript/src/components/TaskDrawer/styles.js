import { rgba } from "polished";
import styled, { keyframes } from "styled-components";
import colors from "../../colors";
import { Status } from "../Status/styles";

export const TaskDrawer = styled.div`
  height: 100vh;
  padding: 20px;
  position: relative;

  ${Status} {
    margin-top: 8px;
    margin-left: 8px;
    margin-bottom: 8px;
  }
`;

export const Title = styled.textarea`
  width: 100%;
  padding: 8px;
  border: none;
  resize: none;
  height: auto;
  outline: none;
  overflow: auto;
  color: #0a163f;
  font-size: 21px;
  font-weight: 500;
  line-height: 24px;
  border-radius: 6px;
  margin-bottom: 16px;
  border: 2px solid transparent;
  transition: border-color 200ms;

  &:hover {
    background: #f5f6f9;
  }

  &:focus {
    background: #f5f6f9;
    border: 2px solid ${colors.blue.base};
  }
`;

export const TaskDetails = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  margin: 0 8px 30px 8px;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
`;

export const Detail = styled.div`
  padding-left: 42px;
  position: relative;
  margin-right: 60px;
`;

export const DetailIcon = styled.div`
  left: 0;
  top: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  border-radius: 50%;
  background: #eff3ff;
  transform: translateY(-50%);
`;

export const DetailLabel = styled.h5`
  color: #7f87a5;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
  letter-spacing: 0.005em;
  text-transform: uppercase;
`;

export const DetailValue = styled.span`
  color: #0a163f;
  font-size: 15px;
  font-weight: 500;
`;

export const Label = styled.label`
  color: #0a163f;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  margin: 0 8px 4px 8px;
`;

export const Description = styled.textarea`
  width: 100%;
  padding: 8px;
  border: none;
  resize: none;
  height: auto;
  outline: none;
  overflow: auto;
  color: #0a163f;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 6px;
  margin-bottom: 16px;
  border: 2px solid transparent;
  transition: border-color 200ms;

  &:hover {
    background: #f5f6f9;
  }

  &:focus {
    background: #f5f6f9;
    border: 2px solid ${colors.blue.base};
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Confirmation = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: ${rgba("#FFFFFF", 0.75)};
  animation: ${fadeIn} 400ms;
`;

const slideInUp = keyframes`
from {
  opacity: 0;
  transform: scale(0.9) translate3d(0, 10px, 0);
}

to {
  opacity: 1;
  transform: scale(1) translate3d(0, 0, 0);
}
`

export const ConfirmationContainer = styled.div`
  padding: 30px;
  max-width: 320px;
  background: white;
  border-radius: 8px;
  position: absolute;
  text-align: center;
  animation: ${slideInUp} 300ms;
  box-shadow:
    0 8px 60px ${rgba(colors.neutral.s8, 0.2)},
    0 2px 6px ${rgba(colors.neutral.s8, 0.15)};

  p {
    font-size: 15px;
    line-height: 19px;
    margin-bottom: 20px;
    color: ${colors.neutral.s9}
  }
`;
