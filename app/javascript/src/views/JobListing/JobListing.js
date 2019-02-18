import React from "react";
import Sticky from "react-stickynode";
import {
  Text,
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

  const gotoApply =() => {
    let url = `/invites/${application.airtableId}/apply`
    // Set an allowApply key on the location state. We then use this inside of
    // the ApplicationFlow to determine wether or not to allow an application
    // with a status of "Application Rejceted" to view the application flow.
    history.push(url, { allowApply: true })
  }

  return (
    <Layout>
      {!isMobile && (
        <Layout.Sidebar>
          <Sticky top={97}>
            <Padding bottom="xs">
              <Heading level={4}>
                {project.primarySkill} project
              </Heading>
            </Padding>
            <Padding bottom="l">
              <Text size="xs">
                You have been invited to apply for a new project
              </Text>
            </Padding>
            <Padding bottom="xl">
              <ProjectAttributes project={project} />
            </Padding>
            <Actions stack={true} onApply={gotoApply} application={application} />
          </Sticky>
        </Layout.Sidebar>
      )}
      <Layout.Main>
        <Card>
          <Padding size="xl">
            <Heading level={2}>{project.primarySkill}</Heading>
            <Padding bottom="l">
              <Text>{project.user.companyName}</Text>
            </Padding>
            <Padding bottom="xl">
              <Text>{project.companyDescription}</Text>
            </Padding>
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
            <Actions fullWidth={true} application={application} onApply={gotoApply} />
          </BottomBar>
        )}
      </Layout.Main>
    </Layout>
  );
};

export default JobListing;
