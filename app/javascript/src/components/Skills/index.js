import { Box, theme } from "@advisable/donut";
import styled from "styled-components";

const Skill = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin-right: 8px;
  padding: 5px 12px;
  margin-bottom: 8px;
  border-radius: 15px;
  align-items: center;
  display: inline-flex;
  color: ${theme.colors.neutral900};
  background: ${theme.colors.neutral200};
`;

export default function Skills({ skills, ...props }) {
  return (
    <Box {...props}>
      {skills.map((skill, i) => (
        <Skill key={i}>{skill.name}</Skill>
      ))}
    </Box>
  );
}
