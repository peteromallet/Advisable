import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/react-hooks";
import { Pencil } from "@styled-icons/heroicons-solid";
import { useHistory, useParams, Link as RouterLink } from "react-router-dom";
import { Stack, Box, Text, BulletList, Button, Tags } from "@advisable/donut";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";
import { PUBLISH_PROJECT } from "./queries";

export default function PublishJob({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const [publishProject, publishProjectResponse] = useMutation(PUBLISH_PROJECT);

  const handlePublish = async () => {
    await publishProject({ variables: { input: { id } } });
    history.push(`/jobs/${id}/published`);
  };

  const { project } = data;
  const { primarySkill, user } = project;
  const industry = user.industry.name;
  const companyType = user.companyType;
  return (
    <>
      <JobSetupStepHeader mb="xs">Review</JobSetupStepHeader>
      <JobSetupStepSubHeader mb="xl">
        Please review the details below. Once you are happy with everything we
        will begin searching for the perfect freelancer for you.
      </JobSetupStepSubHeader>
      <Stack spacing="xxxl" divider="neutral100">
        <Box>
          <Text
            mb="s"
            fontSize="22px"
            color="blue900"
            lineHeight="26px"
            fontWeight="medium"
            letterSpacing="-0.06rem"
          >
            {t(`industryExperienceImportance.2`, {
              primarySkill,
              companyType,
              industry,
            })}
          </Text>
          <Tags
            size="m"
            marginBottom="l"
            tags={project.skills.map((s) => s.name)}
          />
          <RouterLink
            to={{
              pathname: `/jobs/${id}/skills`,
              state: { readyToPublish: true },
            }}
          >
            <Button variant="subtle" size="s" prefix={<Pencil size={24} />}>
              Edit Skills
            </Button>
          </RouterLink>
        </Box>
        <Box>
          <Text
            mb="xs"
            fontSize="l"
            color="blue900"
            fontWeight="medium"
            letterSpacing="-0.03rem"
          >
            Location
          </Text>
          <Text color="neutral700" marginBottom="m">
            {t(`locationImportance.${project.locationImportance}`, {
              location: project.user.location,
            })}
          </Text>
          <RouterLink
            to={{
              pathname: `/jobs/${id}/location`,
              state: { readyToPublish: true },
            }}
          >
            <Button variant="subtle" size="s" prefix={<Pencil size={24} />}>
              Edit Location
            </Button>
          </RouterLink>
        </Box>
        <Box>
          {project.optionalCharacteristics.length > 0 && (
            <>
              <Text
                mb="s"
                fontSize="l"
                color="blue900"
                fontWeight="medium"
                letterSpacing="-0.03rem"
              >
                Optional Characteristics
              </Text>
              <BulletList marginBottom="l">
                {project.optionalCharacteristics.map((characteristic, i) => (
                  <BulletList.Item key={i}>{characteristic}</BulletList.Item>
                ))}
              </BulletList>
            </>
          )}
          {project.requiredCharacteristics.length > 0 && (
            <Box>
              <Text
                mb="s"
                fontSize="l"
                color="blue900"
                fontWeight="medium"
                letterSpacing="-0.03rem"
              >
                Required Characteristics
              </Text>
              <BulletList marginBottom="l">
                {project.requiredCharacteristics.map((characteristic, i) => (
                  <BulletList.Item key={i}>{characteristic}</BulletList.Item>
                ))}
              </BulletList>
            </Box>
          )}
          <RouterLink
            to={{
              pathname: `/jobs/${id}/characteristics`,
              state: { readyToPublish: true },
            }}
          >
            <Button variant="subtle" size="s" prefix={<Pencil size={24} />}>
              Edit Characteristics
            </Button>
          </RouterLink>
        </Box>
        <Box>
          <Text
            mb="s"
            fontSize="l"
            color="blue900"
            fontWeight="medium"
            letterSpacing="-0.03rem"
          >
            Projects
          </Text>
          <BulletList marginBottom="l">
            {project.goals.map((goal, i) => (
              <BulletList.Item key={i}>{goal}</BulletList.Item>
            ))}
          </BulletList>
          <RouterLink
            to={{
              pathname: `/jobs/${id}/description`,
              state: { readyToPublish: true },
            }}
          >
            <Button variant="subtle" size="s" prefix={<Pencil size={24} />}>
              Edit Description
            </Button>
          </RouterLink>
        </Box>
      </Stack>
      <Button
        marginTop="xxl"
        marginBottom="m"
        size="l"
        onClick={handlePublish}
        loading={publishProjectResponse.loading}
      >
        {project.status === "Pending Advisable Confirmation"
          ? "Save Changes"
          : "Publish Job"}
      </Button>
      <Text fontSize="xs" color="neutral600" lineHeight="s">
        By publishing this job you feel like you have completed & submitted
        something substantial. You should feel like you have committed to
        something.
      </Text>
    </>
  );
}
