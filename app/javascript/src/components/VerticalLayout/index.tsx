import styled from "styled-components";

const VerticalLayout = styled.div`
  flex: 1 1 0%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

VerticalLayout.Header = styled.div`
  flex-shrink: 0;
`

VerticalLayout.Content = styled.div`
  flex-grow: 1;
  display: flex;
`

VerticalLayout.Footer = styled.div`
  flex-shrink: 0;
`

export default VerticalLayout