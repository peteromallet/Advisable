import styled from "styled-components";
import { Link } from "react-router-dom";
import plus from "./plus.svg";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1120px;
  padding: 50px 20px;
`;

export const Projects = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

export const Tile = styled.div.attrs({
  style: props => ({
    opacity: props.opacity
  })
})`
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
  padding: 40px;
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

export const NewProject = styled.div`
  height: 280px;
  color: #7781a3;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  border-radius: 4px;
  text-align: center;
  padding-top: 165px;
  position: relative;
  border: 2px dashed #cdd3e5;

  &::before {
    top: 85px;
    left: calc(50% - 30px);
    content: "";
    width: 60px;
    height: 60px;
    display: block;
    position: absolute;
    border-radius: 30px;
    transition: 300ms transform, 300ms box-shadow;
    background: white url(${plus}) no-repeat center;
    box-shadow: 0px 2px 10px rgba(21, 37, 94, 0.05);
  }

  &:hover {
    color: #535f86;
    border-color: #b8bfd5;

    &::before {
      transform: translateY(-1px);
      box-shadow: 0px 2px 50px rgba(21, 37, 94, 0.1);
    }
  }
`;

export const ProjectTitle = styled.h4`
  width: 100%;
  color: #030f37;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  letter-spacing: -0.02em;
`;

export const ProjectStatus = styled.div`
  height: 28px;
  color: #066f56;
  padding: 0 15px;
  font-size: 14px;
  font-weight: 500;
  line-height: 27px;
  background: #e0f8f3;
  border-radius: 15px;
  margin-bottom: 20px;
  display: inline-block;
  letter-spacing: -0.03em;
`;

export const ProjectDescription = styled.p`
  height: 95px;
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


