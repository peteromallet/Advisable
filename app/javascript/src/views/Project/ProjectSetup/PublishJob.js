import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { Pencil } from "@styled-icons/heroicons-solid/Pencil";
import {
  useHistory,
  useParams,
  Link as RouterLink,
  Redirect,
} from "react-router-dom";
import { useNotifications } from "components/Notifications";
import { Stack, Box, Text, BulletList, Button, Tags } from "@advisable/donut";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";
import { PUBLISH_PROJECT } from "./queries";
import dataLayer from "../../../utilities/dataLayer";
import { setupProgress } from "./SetupSteps";

function subText(status) {
  if (status === "Brief Pending Confirmation") {
    return "Once you've confirmed the details of this project, the Advisable team will immediately start identifying candidates for you.";
  }
  return "Once you've submitted this project, it'll be sent to the Advisable team for review.";
}

function buttonLabel(status) {
  if (status === "Brief Pending Confirmation") return "Confirm Project";
  if (status === "Pending Advisable Confirmation") return "Save Changes";
  return "Submit Project";
}

export default function PublishJob({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const notifications = useNotifications();
  const [publishProject, publishProjectResponse] = useMutation(PUBLISH_PROJECT);

  if (!setupProgress(data.project).specialists) {
    return <Redirect to={`/projects/${id}/setup/likely_to_hire`} />;
  }

  const { project } = data;
  const { primarySkill, user } = project;
  const industry = user.industry?.name;
  const companyType = user.companyType;

  const nextStep = (step) => {
    history.push(`/projects/${id}/setup${step}`);
  };

  const handlePublish = async () => {
    // If the project has already been published then just go to the next step.
    // The user is just making edits.
    if (project.publishedAt) {
      nextStep("/published");
      return;
    }

    if (project.deposit && !project.deposit.paid) {
      nextStep("/deposit");
      return;
    }

    const response = await publishProject({ variables: { input: { id } } });
    const { status } = response.data.publishProject.project;
    if (response.errors) {
      notifications.notify("Something went wrong, please try again", {
        variant: "error",
      });
    } else {
      // The status can come back as 'Brief Confirmed' if the project was an
      // assisted project. In these cases the redirect in ProjectSetup/index
      // will handle this case so we only go to next step if the status comes
      // back as pending advisable confirmation.
      if (status === "Pending Advisable Confirmation") {
        nextStep();
      }

      dataLayer.push({ event: "PROJECT_PUBLISHED", projectId: id });
    }
  };

  return (
    <>
      <JobSetupStepHeader mb="xs">Review Project</JobSetupStepHeader>
      <JobSetupStepSubHeader mb="xl">
        Please review the details below. These details will be shown to
        potential specialists so please ensure it&apos;s accurate and compelling
        in order to attract the perfect person.
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
            {t(
              `industryExperienceImportance.${project.industryExperienceImportance}`,
              {
                primarySkill: primarySkill.name,
                companyType,
                industry,
              },
            )}
          </Text>
          <Tags
            size="m"
            marginBottom="l"
            tags={project.skills.map((s) => s.name)}
          />
          <RouterLink
            to={{
              pathname: `/projects/${id}/setup/skills`,
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
              pathname: `/projects/${id}/setup/location`,
              state: { readyToPublish: true },
            }}
          >
            <Button variant="subtle" size="s" prefix={<Pencil size={24} />}>
              Edit Location
            </Button>
          </RouterLink>
        </Box>
        <Box>
          {project.requiredCharacteristics.length > 0 && (
            <>
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
            </>
          )}
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
          <RouterLink
            to={{
              pathname: `/projects/${id}/setup/characteristics`,
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
            Goals
          </Text>
          <BulletList marginBottom="l">
            {project.goals.map((goal, i) => (
              <BulletList.Item key={i}>{goal}</BulletList.Item>
            ))}
          </BulletList>
          <RouterLink
            to={{
              pathname: `/projects/${id}/setup/description`,
              state: { readyToPublish: true },
            }}
          >
            <Button variant="subtle" size="s" prefix={<Pencil size={24} />}>
              Edit Goals
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
        {buttonLabel(project.status)}
      </Button>
      <Text fontSize="xs" color="neutral600" lineHeight="s">
        {subText(project.status)}
      </Text>
    </>
  );
}
