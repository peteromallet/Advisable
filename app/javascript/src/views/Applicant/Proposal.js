import React from "react";
import { Info } from "@styled-icons/feather";
import { camelCase } from "lodash-es";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { Box, Card } from "@advisable/donut";
import Text from "../../components/Text";
import Back from "../../components/Back";
import { FadeInUp } from "../../components/Animation";
import Heading from "../../components/Heading";
import TaskList from "../../components/TaskList";
import Message from "../../components/Message";
import Notice from "../../components/Notice";
import TaskDrawer from "../../components/TaskDrawer";
import SkeletonText from "../../components/SkeletonText";
import SkeletonHeading from "../../components/SkeletonHeading";
import FETCH_PROPOSAL from "./fetchProposal.graphql";
import renderLineBreaks from "../../utilities/renderLineBreaks";

const Loaded = ({ data }) => {
  const { t } = useTranslation();
  const [selectedTask, setSelectedTask] = React.useState(null);

  const application = data.application;
  const project = data.application.project;
  const specialist = data.application.specialist;

  const handleSelectTask = (task) => {
    setSelectedTask(task.id);
  };

  const projectType = camelCase(application.projectType);

  return (
    <>
      <Box paddingX="xl" paddingTop="xl" paddingBottom="l">
        <Back
          to={`/projects/${project.airtableId}/applications/${data.application.airtableId}`}
        >
          Back to application
        </Back>
      </Box>
      <Box paddingX="xl" paddingBottom="s">
        <Heading level={3}>Proposal for "{project.primarySkill?.name}"</Heading>
      </Box>
      <Box paddingX="xl" paddingBottom="l">
        <Text size="s">
          Accepting this proposal wont assign any tasks. You’ll have the
          opportunity to assign and add tasks once you start working with{" "}
          {specialist.firstName}. Once you assign a task, if you’re not happy
          with the quality of the work, we’ll give you a 100% refund for up to 8
          hours work.
        </Text>
      </Box>

      <Box paddingX="xl" paddingBottom="m">
        <Notice icon={<Info />}>
          <Text size="s" weight="semibold" colour="dark">
            {t(`proposals.projectType.${projectType}.title`, {
              firstName: application.specialist.firstName,
              monthlyLimit: application.monthlyLimit,
            })}
          </Text>
          <Text size="s">
            {t(`proposals.projectType.${projectType}.description`)}
          </Text>
        </Notice>
      </Box>

      {application.proposalComment && (
        <Message mx="l" mb="m" title={`Message from ${specialist.firstName}`}>
          {renderLineBreaks(application.proposalComment)}
        </Message>
      )}
      <Box paddingY="m" paddingLeft="xl">
        <Text weight="semibold" colour="dark">
          Suggested tasks
        </Text>
      </Box>
      <TaskDrawer
        isClient
        readOnly
        hideStatus
        taskId={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
      <Box paddingBottom="l">
        <TaskList
          isClient
          hideStatus
          tasks={application.tasks}
          onClickTask={handleSelectTask}
        />
      </Box>
    </>
  );
};

const Loading = () => (
  <Box padding="xl">
    <Box paddingBottom="m">
      <SkeletonHeading />
    </Box>
    <SkeletonText />
  </Box>
);

const Proposal = (props) => {
  const { data, loading } = useQuery(FETCH_PROPOSAL, {
    variables: {
      id: props.match.params.applicationID,
    },
  });

  return (
    <FadeInUp>
      <Card>{loading ? <Loading /> : <Loaded data={data} />}</Card>
    </FadeInUp>
  );
};

export default Proposal;
