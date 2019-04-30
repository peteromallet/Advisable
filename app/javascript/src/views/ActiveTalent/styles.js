import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

export const Cards = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }

  ${Skeleton.Card} {
    float: left;
    height: 210px;
    margin-bottom: 25px;
    text-align: center;

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
  }
`;
