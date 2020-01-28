import styled from "styled-components";
import { StyledCard } from "@advisable/donut";

export const TalentCard = styled.div`
  float: left;
  margin-bottom: 25px;
  text-align: center;

  ${StyledCard} {
    transition: box-shadow 200ms, transform 200ms;
  }

  ${StyledCard}:hover {
    cursor: pointer;
    transform: translateY(-1px);
    box-shadow: 0px 20px 60px -20px rgba(26, 35, 67, 0.2);
  }

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
`