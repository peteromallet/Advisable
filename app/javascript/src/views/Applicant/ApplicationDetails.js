import React from "react";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Skills from "../../components/Skills";
import Divider from "src/components/Divider";
import Heading from "src/components/Heading";
import { Padding } from "src/components/Spacing";
import { FadeInUp } from "src/components/Animation";
import AdvisableMessage from "./AdvisableMessage";
import Questions from "./Questions";
import PreviousProjects from "./PreviousProjects";
import MoreApplicants from "./MoreApplicants";

export default ({ data, history }) => {
  const project = data.project;
  const application = data.project.application;

  return (
    <>
      <FadeInUp duration="500ms">
        <Padding bottom="l">
          <Card>
            <Padding left="xl" top="l" bottom="l">
              <Heading level={4}>Applied to {project.primarySkill}</Heading>
            </Padding>
            <Divider />
            <Padding size="xl">
              <Padding bottom="l">
                <Heading level={6}>Introduction</Heading>
                <Text size="s">{data.project.application.introduction}</Text>
              </Padding>
              <Padding bottom="xs">
                <Heading level={6}>Skills</Heading>
              </Padding>
              <Skills skills={data.project.application.specialist.skills} />
              {application.comment && (
                <Padding top="l">
                  <AdvisableMessage>{application.comment}</AdvisableMessage>
                </Padding>
              )}
            </Padding>
          </Card>
        </Padding>
      </FadeInUp>
      <FadeInUp duration="500ms" delay="100ms">
        <Questions questions={application.questions} />
      </FadeInUp>
      <FadeInUp duration="500ms" delay="200ms">
        <PreviousProjects data={data} />
      </FadeInUp>
      <FadeInUp duration="500ms" delay="300ms">
        <MoreApplicants data={data} onClick={a => history.push(a.airtableId)} />
      </FadeInUp>
    </>
  );
};
