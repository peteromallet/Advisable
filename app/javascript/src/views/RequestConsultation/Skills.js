import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Text, Button } from "@advisable/donut";
import TagSelect from "../../components/TagSelect";

const RequestConsultationSkills = ({ data, nextStep }) => {
  const history = useHistory();
  const location = useLocation();

  const handleSkillsUpdate = skills => {
    history.replace({
      ...location,
      state: {
        skills,
      },
    });
  };

  return (
    <>
      <Text fontSize="s" fontWeight="medium" mb="xs" color="neutral.5">
        Step 1
      </Text>
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        fontWeight="semibold"
        color="blue.8"
        letterSpacing="-0.025em"
      >
        Which of {data.specialist.firstName}’s skills are you interested in?
      </Text>
      <Text color="neutral.8" lineHeight="s" mb="l">
        This is some sub text to support the required action for this step. For
        aesthetic reasons it should span more than one line.
      </Text>
      <TagSelect
        mb="l"
        selected={location.state?.skills || []}
        tags={data.specialist.skills.map(s => s.name)}
        onChange={skills => handleSkillsUpdate(skills)}
      />
      <Button appearance="primary" intent="success" onClick={nextStep}>
        Continue
      </Button>
    </>
  );
};

export default RequestConsultationSkills;
