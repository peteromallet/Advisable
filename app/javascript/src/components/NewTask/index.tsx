import * as React from "react";
import Icon from "../../components/Icon";
import { NewTask, NewTaskIcon } from "./styles";

interface Props {
  onClick: (e: React.SyntheticEvent) => void;
}

export default ({ onClick }: Props) => {
  return (
    <NewTask onClick={onClick}>
      <NewTaskIcon>
        <Icon icon="plus" strokeWidth={2} />
      </NewTaskIcon>
      Add a task
    </NewTask>
  );
};
