import styled from "styled-components";

export const Field = styled.div`
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  background: rgba(29, 39, 75, 0.06);
  border: 2px solid ${props => (props.focused ? "#3360FF" : "transparent")};
`;
