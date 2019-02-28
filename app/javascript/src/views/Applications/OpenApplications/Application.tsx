import * as React from "react";
import * as moment from "moment";
import Text from "../../../components/Text";
import Icon from "../../../components/Icon";
import Styles from "../../../components/Styles";
import Button from "../../../components/Button";
import Padding from "../../../components/Spacing/Padding";
import ApplicationStatus from "../../../components/ApplicationStatus";
import { ApplicationType } from "../../../types";
import { Card, Notice } from "./styles";

interface Props {
  application: ApplicationType;
}

const Application = ({ application }: Props) => {
  return (
    <Card>
      <Padding size="m">
        <Padding bottom="m">
          <Text weight="semibold" colour="dark">
            {application.project.primarySkill}
          </Text>
          <Text size="xs">
            Applied {moment(application.appliedAt).fromNow()}
          </Text>
          <ApplicationStatus>{application.status}</ApplicationStatus>
        </Padding>
        <Notice>
          <Icon icon="info" />
          <Text size="s">
            Your application has been sent and is being reviewed.
          </Text>
          <Button styling="plain">Take Action</Button>
        </Notice>
      </Padding>
    </Card>
  );
};

export default Application;
