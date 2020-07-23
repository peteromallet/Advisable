import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/react-hooks";
import { Pencil } from "@styled-icons/heroicons-solid";
import { Redirect, useParams, Link as RouterLink } from "react-router-dom";
import {
  Card,
  Stack,
  Box,
  Text,
  BulletList,
  Button,
  Tags,
} from "@advisable/donut";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";
import { PUBLISH_PROJECT } from "./queries";

export default function PublishJob({ data }) {
  const { id } = useParams();
  const { t } = useTranslation();
  const [publishProject, publishProjectResponse] = useMutation(PUBLISH_PROJECT);

  const { project } = data;
  const { primarySkill, user } = project;
  const industry = user.industry.name;
  const companyType = user.companyType;

  if (publishProjectResponse.data) {
    return <Redirect to={`/projects/${id}`} />;
  }

  return (
    <Card
      as={motion.div}
      padding="52px"
      initial={{ opacity: 0, y: 100 }}
      animate={{ zIndex: 2, opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      exit={{ y: -40, opacity: 0, zIndex: 1, scale: 0.9, position: "absolute" }}
    >
      <JobSetupStepHeader mb="xs">Review and Publish</JobSetupStepHeader>
      <JobSetupStepSubHeader mb="xl">
        Please review the details below. Once you are happy with everything we
        will begin searching for the perfect freelancer for you.
      </JobSetupStepSubHeader>
      <Stack spacing="xxxl" divider="neutral100">
        <Box>
          <Text
            mb="s"
            fontSize="24px"
            color="blue900"
            lineHeight="28px"
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
            to={{ pathname: `/jobs/${id}`, state: { readyToPublish: true } }}
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
        onClick={() => publishProject({ variables: { input: { id } } })}
        loading={publishProjectResponse.loading}
      >
        Publish Job
      </Button>
      <Text fontSize="xs" color="neutral600" lineHeight="s">
        By publishing this job you feel like you have completed & submitted
        something substantial. You should feel like you have committed to
        something.
      </Text>
    </Card>
  );
}
