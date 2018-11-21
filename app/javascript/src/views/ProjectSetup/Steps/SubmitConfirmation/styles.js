import styled from "styled-components"

export const Wrapper = styled.div`
  text-align: center;

  img {
    max-width: 400px;
    margin-bottom: 10px;
    transform: translateX(10px);
  }

  h4 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 30px;
  }
`

export const Progress = styled.div`
  height: 5px;
  margin: 0 auto;
  max-width: 300px;
  border-radius: 5px;
  background: #E3E6F1;
  margin-bottom: 20px;

  div {
    height: 100%;
    border-radius: 5px;
    background: #17CDA1;
  }
`