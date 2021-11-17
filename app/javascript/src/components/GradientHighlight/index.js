import styled from "styled-components";

// TODO: update colors to use theme colours. Using same ones from new website for now.
export const StyledGradientHighlight = styled.span`
  background-image: linear-gradient(135deg, #c518ce, #0c3fec);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GradientHighlight = StyledGradientHighlight;

export default GradientHighlight;
