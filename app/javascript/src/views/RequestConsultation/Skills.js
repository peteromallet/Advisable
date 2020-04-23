import React from "react";
import { ArrowRight } from "@styled-icons/feather";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Card, Text, Button } from "@advisable/donut";
import TagSelect from "../../components/TagSelect";
import useViewer from "../../hooks/useViewer";
import { useCreateConsultation } from "./queries";

const RequestConsultationSkills = ({ data }) => {
  const params = useParams();
  const viewer = useViewer();
  const history = useHistory();
  const location = useLocation();
  const [createConsultation, { loading }] = useCreateConsultation();
  const { specialist } = data;

  const handleSkillUpdate = (skill) => {
    history.replace({
      ...location,
      state: {
        ...location.state,
        skill,
      },
    });
  };

  const handleContinue = () => {
    if (viewer?.isClient) {
      handleCreateConsultation();
    } else {
      history.push({
        pathname: `/request_consultation/${params.specialistId}/details`,
        state: {
          ...location.state,
          completed: [...(location?.state?.compelted || []), "SKILLS"],
        },
      });
    }
  };

  const handleCreateConsultation = async () => {
    const response = await createConsultation();
    const consultation = response.data?.createConsultation.consultation;
    history.push({
      pathname: `/request_consultation/${params.specialistId}/availability`,
      state: {
        ...location.state,
        consultationId: consultation.id,
        completed: [...(location?.state?.completed || []), "SKILLS"],
      },
    });
  };

  return (
    <Card padding={["m", "l"]}>
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.025em"
      >
        Which of {specialist.firstName}’s skills are you interested in?
      </Text>
      <Text color="neutral800" lineHeight="s" mb="l">
        Please select which skill you are interested in talking to{" "}
        {specialist.firstName} about in a 30 minute consultation.
      </Text>
      <TagSelect
        multiple={false}
        selected={location.state?.skill}
        tags={specialist.skills.map((s) => s.name)}
        onChange={(skill) => handleSkillUpdate(skill)}
      />
      <Button
        mt="xxl"
        loading={loading}
        width={["100%", "auto"]}
        onClick={handleContinue}
        suffix={<ArrowRight />}
        disabled={!location.state?.skill}
      >
        Continue
      </Button>
    </Card>
  );
};

export default RequestConsultationSkills;
