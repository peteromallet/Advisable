import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1110px;
  padding: 50px 20px;

  @media screen and (max-width: 800px) {
    padding-top: 30px;
  }

  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

export const ApplicantsContainer = styled.div`
  flex: 1% 1 0;
`;
