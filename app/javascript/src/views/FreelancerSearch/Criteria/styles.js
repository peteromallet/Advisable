import { rgba } from "polished";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "@advisable/donut";
import image01 from "./01.jpg";
import image02 from "./02.jpg";
import image03 from "./03.jpg";
import image04 from "./04.jpg";
import image05 from "./05.jpg";
import image06 from "./06.jpg";

export const StyledImages = styled.div`
  width: 100%;
  margin-right: -40px;
  position: relative;
`;

export const StyledImage = styled(motion.div)`
  background: #ddd;
  position: absolute;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 8px 40px ${rgba(theme.colors.neutral[8], 0.2)};

  &:nth-child(1) {
    top: 50%;
    left: 50%;
    width: 70px;
    height: 100px;
    margin-top: -120px;
    margin-left: -250px;
    background-image: url(${image01});
  }

  &:nth-child(2) {
    top: 50%;
    left: 50%;
    width: 160px;
    height: 200px;
    margin-top: -220px;
    margin-left: -160px;
    background-image: url(${image02});
  }

  &:nth-child(3) {
    top: 50%;
    left: 50%;
    width: 210px;
    height: 280px;
    margin-top: -280px;
    margin-left: 20px;
    background-image: url(${image03});
  }

  &:nth-child(4) {
    top: 50%;
    left: 50%;
    width: 210px;
    height: 280px;
    margin-top: 0;
    margin-left: -230px;
    background-image: url(${image04});
  }

  &:nth-child(5) {
    top: 50%;
    left: 50%;
    width: 160px;
    height: 200px;
    margin-top: 20px;
    background-image: url(${image05});
  }

  &:nth-child(6) {
    top: 50%;
    left: 50%;
    width: 70px;
    height: 100px;
    margin-top: 20px;
    margin-left: 180px;
    background-image: url(${image06});
  }
`;
