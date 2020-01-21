import styled from "styled-components";
import { Link } from "react-router-dom";
import { Status } from "../../components/Status/styles";

export const Projects = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

export const Tile = styled.div.attrs(props => ({
  style: {
    opacity: props.opacity,
  },
}))`
  float: left;
  margin-bottom: 30px;

  @media (min-width: 961px) {
    width: 31.666666667%;

    &:nth-child(3n + 2) {
      margin-left: 2.5%;
      margin-right: 2.5%;
    }
  }

  @media (max-width: 960px) and (min-width: 650px) {
    width: 48%;

    &:nth-child(odd) {
      margin-right: 2%;
    }

    &:nth-child(even) {
      margin-left: 2%;
    }
  }

  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 25px;
  }
`;

export const ProjectCard = styled(Link)`
  padding: 30px;
  height: 280px;
  display: block;
  overflow: hidden;
  background: white;
  border-radius: 4px;
  text-decoration: none;
  transition: box-shadow 300ms, transform 300ms;
  box-shadow: 0px 3px 10px rgba(14, 29, 78, 0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 10px 50px rgba(14, 29, 78, 0.15);
  }

  ${Status} {
    margin-bottom: 20px;
  }

  @media (max-width: 650px) {
    padding: 30px;
  }
`;

export const ProjectCardPlaceholder = styled.div`
  width: 100%;
  height: 280px;
  padding: 40px;
  border-radius: 4px;
  border: 1px solid #d9dce9;
`;

export const ProjectTitle = styled.h4`
  width: 100%;
  color: #030f37;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const ProjectDescription = styled.p`
  height: 115px;
  color: #4d5880;
  display: block;
  font-size: 14px;
  overflow: hidden;
  line-height: 19px;
  position: relative;
  font-weight: normal;

  &::after {
    left: 0;
    bottom: 0;
    content: "";
    width: 100%;
    height: 50px;
    position: absolute;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  }
`;
