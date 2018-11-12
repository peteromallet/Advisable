import styled from "styled-components";

export const Field = styled.div`
  padding: 10px;
  border-radius: 8px;
  background: #ebedf3;
  margin-bottom: 20px;
  border: 2px solid ${props => props.focused ? '#CFD4E3': '#ebedf3'};
`;
