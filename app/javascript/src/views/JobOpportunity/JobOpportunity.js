import React from "react";
import Sticky from "components/Sticky";
import { Box, Text, Card, Button } from "@advisable/donut";
import { List, Layout, BottomBar } from "src/components";
import { useScreenSize } from "src/utilities/screenSizes";
import ProjectAttributes from "./ProjectAttributes";
import { useMutation } from "@apollo/client";
import { APPLY_FOR_PROJECT } from "./queries";

let JobListing = ({ project, history }) => {
  const isMobile = useScreenSize("small");
  const [apply] = useMutation(APPLY_FOR_PROJECT, {
    variables: { input: { project: project.id } },
  });

  const gotoApply = async () => {
    const response = await apply();
    const applicationId = response.data.applyForProject.application.id;
    const url = `/invites/${applicationId}/apply`;
    // Set an allowApply key on the location state. We then use this inside of
    // the ApplicationFlow to determine wether or not to allow an application
    // with a status of "Application Rejceted" to view the application flow.
    history.push(url, { allowApply: true });
  };

  return (
    <Layout>
      {!isMobile && (
        <Layout.Sidebar>
          <Sticky offset={98}>
            <Text
              mb="8px"
              as="h4"
              fontSize="20px"
              color="blue900"
              fontWeight="medium"
            >
              New Project Invitation
            </Text>
            <Text mb="l" fontSize="s" lineHeight="18px" color="neutral700">
              You have been invited to apply to a new project
            </Text>
            <Box marginBottom="xl">
              <ProjectAttributes project={project} />
            </Box>
            <Button onClick={gotoApply} size="l" width="100%" mb="12px">
              Apply
            </Button>
          </Sticky>
        </Layout.Sidebar>
      )}
      <Layout.Main>
        <Card padding="xl">
          <Text
            as="h2"
            mb="xs"
            color="blue900"
            fontSize="28px"
            fontWeight="medium"
            letterSpacing="-0.02em"
          >
            {project.primarySkill?.name} Project
          </Text>
          {(project.industry || project.companyType) && (
            <Text mb="32px" mt="8px" fontSize="s" color="neutral600">
              {project.industry} {project.companyType}
            </Text>
          )}
          <Text
            as="h6"
            mb="4px"
            fontSize="18px"
            fontWeight="medium"
            color="blue900"
          >
            Client Description
          </Text>
          <Text lineHeight="m" color="neutral800" mb="l">
            {project.companyDescription}
          </Text>
          {isMobile && (
            <Box marginBottom="xl">
              <ProjectAttributes project={project} />
            </Box>
          )}
          <Box marginBottom="xl">
            <Text
              as="h6"
              mb="12px"
              fontSize="18px"
              fontWeight="medium"
              color="blue900"
            >
              Goals
            </Text>
            <List>
              {project.goals.map((item) => (
                <List.Item key={item}>{item}</List.Item>
              ))}
            </List>
          </Box>
          <Box marginBottom="xl">
            <Text
              as="h6"
              mb="12px"
              fontSize="18px"
              fontWeight="medium"
              color="blue900"
            >
              Essential Characteristics
            </Text>
            <List>
              {project.requiredCharacteristics.map((item) => (
                <List.Item key={item}>{item}</List.Item>
              ))}
            </List>
          </Box>
          {project.optionalCharacteristics.length > 0 && (
            <>
              <Text
                as="h6"
                mb="12px"
                fontSize="18px"
                fontWeight="medium"
                color="blue900"
              >
                Nice-To-Have Characteristics
              </Text>
              <List>
                {project.optionalCharacteristics.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </>
          )}
        </Card>

        {isMobile && (
          <BottomBar>
            <Button onClick={gotoApply} size="l" width="100%" mb="12px">
              Apply
            </Button>
          </BottomBar>
        )}
      </Layout.Main>
    </Layout>
  );
};

export default JobListing;
