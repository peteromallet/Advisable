import React from "react";
import { useField } from "formik";
import { theme } from "@advisable/donut";
import { Plus } from "@styled-icons/feather";
import styled from "styled-components";

const StyledPopularSkill = styled.button`
  border: none;
  outline: none;
  color: ${theme.colors.blue900};
  line-height: 1;
  font-size: 15px;
  appearance: none;
  font-weight: 500;
  margin-right: 8px;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  background: #eff0f3;
  letter-spacing: -0.01rem;

  svg {
    color: #a2a3c0;
    margin-right: 4px;
  }
`;

export default function PopularSkills({ skills }) {
  const [field, meta, helpers] = useField("skills");

  const filtered = React.useMemo(() => {
    return skills.filter((s) => field.value.indexOf(s.name) === -1);
  }, [skills, field.value]);

  return filtered.map((skill, i) => (
    <StyledPopularSkill
      key={skill.id}
      onClick={() => helpers.setValue([...field.value, skill.name])}
    >
      <Plus size={16} strokeWidth={2} />
      {skill.name}
    </StyledPopularSkill>
  ));
}
