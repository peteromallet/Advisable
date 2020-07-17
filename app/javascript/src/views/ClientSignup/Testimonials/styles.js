import styled from "styled-components";
import { theme } from "@advisable/donut";
import TESTIMONIALS from "./data";
import background from "./bg.png";

export const Quotes = styled.div`
  display: flex;
  width: calc(100% * ${TESTIMONIALS.length});
  transition: transform 300ms;
  transform: translateX(
    -${(props) => props.current * (100.0 / TESTIMONIALS.length)}%
  );
`;

export const Quote = styled.div`
  color: white;
  display: flex;
  padding: 0 40px;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: calc(100% / ${TESTIMONIALS.length});
  transition: opacity 300ms;
  opacity: ${(props) => (props.isCurrent ? 1 : 0)};
`;

export const Logos = styled.div`
  width: calc(100% - 40px);
  left: 20px;
  bottom: 20px;
  display: flex;
  position: absolute;
  justify-content: space-around;
`;

export const Logo = styled.div`
  width: 100%;
  height: 36px;
  margin: 0 12px;
  cursor: pointer;
  background-size: contain;
  transition: opacity 200ms;
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${(props) => (props.isCurrent ? 1 : 0.5)};

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledStarRating = styled.div`
  top: 20px;
  left: 20px;
  z-index: 2;
  position: absolute;
`;

export const StyledStar = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  border-radius: 2px;
  background: #00b67a;
  align-items: center;
  display: inline-flex;
  justify-content: center;
`;

export const Sidebar = styled.div`
  top: 58px;
  right: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 550px;
  height: calc(100vh - 58px);
  display: flex;
  position: fixed;
  overflow: hidden;
  align-items: center;
  background-size: cover;
  background-image: url(${background});
  background-color: ${theme.colors.blue[4]};
`;
