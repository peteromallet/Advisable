import React from "react";
import Linkify from "linkifyjs/react";
import { Box, Card } from "@advisable/donut";
import Text from "src/components/Text";
import Skills from "../../components/Skills";
import Divider from "src/components/Divider";
import Heading from "src/components/Heading";
import { FadeInUp } from "src/components/Animation";
import AdvisableMessage from "./AdvisableMessage";
import Questions from "./Questions";
import PreviousProjects from "./PreviousProjects";
import MoreApplicants from "./MoreApplicants";

export default function ApplicationDetails({ data, history }) {
  const project = data.project;
  const application = data.project.application;

  return (
    <>
      <FadeInUp duration="500ms">
        <Box paddingBottom="l">
          <Card>
            <Box paddingLeft="xl" paddingY="l">
              <Heading level={4}>
                Applied to {project.primarySkill?.name}
              </Heading>
            </Box>
            <Divider />
            <Box padding="xl">
              <Box paddingBottom="l">
                <Heading level={6}>Introduction</Heading>
                <Linkify options={{ attributes: { rel: "nofollow" } }}>
                  <Text size="s">{data.project.application.introduction}</Text>
                </Linkify>
              </Box>
              <Box paddingBottom="xs">
                <Heading level={6}>Skills</Heading>
              </Box>
              <Skills skills={data.project.application.specialist.skills} />
              {application.comment && (
                <Box paddingTop="l">
                  <AdvisableMessage>{application.comment}</AdvisableMessage>
                </Box>
              )}
            </Box>
          </Card>
        </Box>
      </FadeInUp>
      <FadeInUp duration="500ms" delay="100ms">
        <Questions questions={application.questions} />
      </FadeInUp>
      <FadeInUp duration="500ms" delay="200ms">
        <PreviousProjects data={data} />
      </FadeInUp>
      <FadeInUp duration="500ms" delay="300ms">
        <MoreApplicants
          data={data}
          onClick={(a) => history.push(a.airtableId)}
        />
      </FadeInUp>
    </>
  );
}
