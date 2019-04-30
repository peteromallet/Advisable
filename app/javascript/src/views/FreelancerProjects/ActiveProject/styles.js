import styled from "styled-components";

export const ActiveProject = styled.div`
  float: left;
  margin-bottom: 25px;

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