import React from "react";
import Spacing from "../Spacing";
import styled from "styled-components";

const Skill = styled.div`
  height: 30px;
  color: #0f3776;
  padding: 0 20px;
  font-size: 15px;
  font-weight: 500;
  margin-right: 10px;
  align-items: center;
  background: #D9E7FF;
  border-radius: 15px;
  display: inline-flex;
  letter-spacing: -0.03em;
`;

export default ({ skills, ...props }) => {
  return (
    <Spacing {...props}>
      {skills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
    </Spacing>
  );
};
