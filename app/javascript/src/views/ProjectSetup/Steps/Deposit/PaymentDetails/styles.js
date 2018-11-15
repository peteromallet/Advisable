import styled from "styled-components";

export const Field = styled.div`
  padding: 10px;
  border-radius: 8px;
  background: #ebedf3;
  margin-bottom: 20px;
  border: 2px solid ${props => props.focused ? '#3360FF': '#ebedf3'};
`;

export const Total = styled.div`
  margin: 20px 0;
  padding: 20px 0;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #d6dbe9;
`;

export const Amount = styled.h3`
  color: #04144d;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const Label = styled.p`
  color: #959aaa;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;
