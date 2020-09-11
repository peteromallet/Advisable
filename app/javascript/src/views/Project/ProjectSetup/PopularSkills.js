import React from "react";
import { rgba } from "polished";
import { useField } from "formik";
import { Text, theme } from "@advisable/donut";
import { Plus } from "@styled-icons/feather";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledPopularSkills = styled.div`
  position: relative;
`;

const StyledPopularSkillDisabled = styled.div`
  z-index: 9;
  width: 100%;
  height: 100%;
  display: flex;
  color: ${theme.colors.neutral700};
  position: absolute;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);

  span {
    font-size: 15px;
    padding: 8px 8px;
    border-radius: 8px;
    background: white;
    font-weight: 500;
    letter-spacing: -0.02rem;
    box-shadow: 0 2px 8px -2px ${rgba(theme.colors.neutral900, 0.24)};
  }
`;

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

  &[disabled] {
    opacity: 0.5;
  }

  svg {
    color: #a2a3c0;
    margin-right: 4px;
  }
`;

export default function PopularSkills({
  industry,
  companyType,
  skills,
  disabled,
}) {
  const { t } = useTranslation();
  const [field, meta, helpers] = useField("skills");

  const filtered = React.useMemo(() => {
    return skills.filter((s) => field.value.indexOf(s.name) === -1);
  }, [skills, field.value]);

  if (filtered.length === 0) return null;

  return (
    <>
      <Text
        mb="s"
        fontSize="17px"
        color="blue900"
        fontWeight="medium"
        letterSpacing="-0.03rem"
      >
        {t("jobSetup.popularSkills", {
          industry,
          companyType,
        })}
      </Text>
      <StyledPopularSkills>
        {disabled && (
          <StyledPopularSkillDisabled>
            <span>You can not add more than 5 skills.</span>
          </StyledPopularSkillDisabled>
        )}
        {filtered.map((skill, i) => (
          <StyledPopularSkill
            type="button"
            key={skill.id}
            disabled={disabled}
            onClick={() => helpers.setValue([...field.value, skill.name])}
          >
            <Plus size={16} strokeWidth={2} />
            {skill.name}
          </StyledPopularSkill>
        ))}
      </StyledPopularSkills>
    </>
  );
}
