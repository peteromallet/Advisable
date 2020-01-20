import styled from "styled-components";
import { motion } from "framer-motion";
import image01 from "./01.jpg";
import image02 from "./02.jpg";
import image03 from "./03.jpg";
import image04 from "./04.jpg";
import image05 from "./05.jpg";
import image06 from "./06.jpg";

export const Container = styled.div`
  position: relative;
  padding-top: 190px;
  padding-bottom: 40px;

  @media only screen and (min-width: 1000px) {
    padding-top: 0;
    padding-right: 55%;
  }
`;

export const StyledImages = styled.div`
  top: 10px;
  left: 50%;
  width: 100%;
  position: absolute;
  transform: translateX(-50%);

  @media only screen and (min-width: 1000px) {
    right: 0;
    top: 50%;
    left: auto;
    width: 55%;
    height: 500px;
    transform: translateX(0) translateY(-54%);
  }
`;

export const StyledImage = styled(motion.div)`
  background: #ddd;
  position: absolute;
  border-radius: 12px;
  background-size: cover;
  background-position: center;

  &:nth-child(1) {
    top: -4px;
    left: 20px;
    width: 26%;
    height: 150px;
    background-image: url(${image01});

    @media only screen and (min-width: 1000px) {
      top: 50%;
      left: 50%;
      width: 130px;
      height: 200px;
      margin-top: -117px;
      margin-left: -245px;
    }
  }

  &:nth-child(2) {
    top: -20px;
    left: calc(28% + 20px);
    width: 16%;
    height: 96px;
    background-image: url(${image02});

    @media only screen and (min-width: 1000px) {
      top: 50%;
      left: 50%;
      width: 120px;
      height: 180px;
      margin-top: -164px;
      margin-left: -95px;
    }
  }

  &:nth-child(3) {
    top: 84px;
    left: calc(28% + 20px);
    width: 16%;
    height: 96px;
    background-image: url(${image03});

    @media only screen and (min-width: 1000px) {
      top: 50%;
      left: 50%;
      width: 200px;
      height: 320px;
      margin-top: -243px;
      margin-left: 45px;
    }
  }

  &:nth-child(4) {
    top: 20px;
    left: calc(46% + 20px);
    width: 12%;
    height: 70px;
    background-image: url(${image04});

    @media only screen and (min-width: 1000px) {
      top: 50%;
      left: 50%;
      width: 90px;
      height: 140px;
      margin-top: 103px;
      margin-left: -205px;
    }
  }

  &:nth-child(5) {
    top: 98px;
    left: calc(46% + 20px);
    width: 12%;
    height: 70px;
    background-image: url(${image05});

    @media only screen and (min-width: 1000px) {
      top: 50%;
      left: 50%;
      width: 120px;
      height: 180px;
      margin-top: 36px;
      margin-left: -95px;
    }
  }

  &:nth-child(6) {
    top: 10px;
    left: calc(60% + 20px);
    width: 30%;
    height: 180px;
    background-image: url(${image06});

    @media only screen and (min-width: 1000px) {
      top: 50%;
      left: 50%;
      width: 60px;
      height: 90px;
      margin-top: 87px;
      margin-left: 45px;
    }
  }
`;
