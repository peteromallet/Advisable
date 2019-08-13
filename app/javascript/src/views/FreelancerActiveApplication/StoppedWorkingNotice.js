import React from "react";
import { Text } from "@advisable/donut";
import Notice from "../../components/Notice";

const StoppedWorkingNotice = ({ client }) => {
  return (
    <Notice icon="info" elevation="s">
      <Text size="s" weight="medium" color="neutral.9" mb="xxs">
        This project has ended
      </Text>
      <Text size="xs" lineHeight="xs" color="neutral.5">
        You have stopped working with {client}. You will not be able to action
        any more tasks for this project unless {client} resumes the project.
      </Text>
    </Notice>
  );
};

export default StoppedWorkingNotice;
