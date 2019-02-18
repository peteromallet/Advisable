import React from "react";
import styled from "styled-components";

const Container = styled.ul``;

const Item = styled.li`
  color: #323A57;
  font-size: 15px;
  line-height: 20px;
  padding: 12px 15px;
  border-radius: 8px;
  background: #f5f6f9;
  margin-bottom: 5px;
  &:last-child { margin-bottom: 0; }
`;

const List = ({ items }) => {
  return (
    <Container>{items.map((item, i) => <Item key={i}>{item}</Item>)}</Container>
  );
};

export default List;
