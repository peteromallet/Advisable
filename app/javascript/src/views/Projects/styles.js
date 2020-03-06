import styled from "styled-components";
import { Link } from "react-router-dom";
import { Status } from "../../components/Status/styles";

export const ProjectCard = styled(Link)`
  padding: 30px;
  height: 280px;
  width: 100%;
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
