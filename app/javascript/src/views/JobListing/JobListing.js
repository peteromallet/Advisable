import React from "react";
import Sticky from "../../components/Sticky";
import { Text } from "@advisable/donut";
import {
  Card,
  List,
  Layout,
  Heading,
  Padding,
  BottomBar,
} from "src/components";
import { useScreenSize } from "src/utilities/screenSizes";
import ProjectAttributes from "./ProjectAttributes";
import Actions from "./Actions";

let JobListing = ({ application, history }) => {
  const isMobile = useScreenSize("small");
  const { project } = application;

  const gotoApply = () => {
    let url = `/invites/${application.airtableId}/apply`;
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
              as="h4"
              fontSize={22}
              lineHeight="l"
              color="blue.9"
              fontWeight="semibold"
            >
              {project.primarySkill} project
            </Text>
            {(project.industry || project.companyType) && (
              <Text
                mb="s"
                fontSize="m"
                lineHeight="s"
                mt="xs"
                color="neutral.8"
              >
                {project.industry} {project.companyType}
              </Text>
            )}
            <Text mt="s" mb="l" size="xs" lineHeight="xs" color="neutral.7">
              You have been invited to apply for a new project
            </Text>
            <Padding bottom="xl">
              <ProjectAttributes project={project} />
            </Padding>
            <Actions
              stack={true}
              onApply={gotoApply}
              application={application}
            />
          </Sticky>
        </Layout.Sidebar>
      )}
      <Layout.Main>
        <Card>
          <Padding size="xl">
            <Text
              as="h2"
              color="blue.9"
              fontSize="xxl"
              fontWeight="semibold"
              mb="xs"
            >
              {project.primarySkill}
            </Text>
            <Text lineHeight="m" color="neutral.7" mb="l">
              {project.companyDescription}
            </Text>
            {isMobile && (
              <Padding bottom="xl">
                <ProjectAttributes project={project} />
              </Padding>
            )}
            <Padding bottom="xl">
              <Heading level={6}>Goals</Heading>
              <List items={project.goals} />
            </Padding>
            <Padding bottom="xl">
              <Heading level={6}>Essential Characteristics</Heading>
              <List items={project.requiredCharacteristics} />
            </Padding>
            {project.optionalCharacteristics.length > 0 && (
              <React.Fragment>
                <Heading level={6}>Nice-To-Have Characteristics</Heading>
                <List items={project.optionalCharacteristics} />
              </React.Fragment>
            )}
          </Padding>
        </Card>

        {isMobile && (
          <BottomBar>
            <Actions
              fullWidth={true}
              application={application}
              onApply={gotoApply}
            />
          </BottomBar>
        )}
      </Layout.Main>
    </Layout>
  );
};

export default JobListing;
