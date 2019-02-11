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

let JobListing = ({ application }) => {
  const isMobile = useScreenSize("small");
  const { project } = application;

  return (
    <Layout>
      {!isMobile && (
        <Layout.Sidebar>
          <Sticky top={97}>
            <Padding bottom="xs">
              <Heading level={4}>
                {project.primarySkill} at {project.user.companyName}
              </Heading>
            </Padding>
            <Padding bottom="l">
              <Text size="xs">
                You have been invited to apply for a project with{" "}
                {project.user.companyName}
              </Text>
            </Padding>
            <Padding bottom="xl">
              <ProjectAttributes project={project} />
            </Padding>
            <Actions stack={true} application={application} />
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
            <Actions fullWidth={true} application={application} />
          </BottomBar>
        )}
      </Layout.Main>
    </Layout>
  );
};

export default JobListing;
