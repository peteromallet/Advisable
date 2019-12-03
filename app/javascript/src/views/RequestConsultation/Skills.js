import React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Box, Text, RoundedButton, Icon } from "@advisable/donut";
import TagSelect from "../../components/TagSelect";

const RequestConsultationSkills = ({ data, nextStep }) => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();

  const handleSkillUpdate = skill => {
    history.replace({
      ...location,
      state: {
        ...location.state,
        skill,
      },
    });
  };

  return (
    <Box padding={["m", "l"]}>
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
        Please select which skill you are interested in talking to{" "}
        {data.specialist.firstName} about in a 30 minute consultation.
      </Text>
      <TagSelect
        multiple={false}
        selected={location.state?.skill}
        tags={data.specialist.skills.map(s => s.name)}
        onChange={skill => handleSkillUpdate(skill)}
      />
      <Box height={1} bg="neutral.1" mt="xl" mb={["m", "l"]} />
      <RoundedButton
        width={["100%", "auto"]}
        onClick={() => nextStep(params, location.state)}
        suffix={<Icon icon="arrow-right" />}
        disabled={!location.state?.skill}
      >
        Continue
      </RoundedButton>
    </Box>
  );
};

export default RequestConsultationSkills;
