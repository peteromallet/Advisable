// Renders the drawer for a task
import * as React from "react";
import { Query, Mutation } from "react-apollo";
import Drawer from "../Drawer";
import { TaskDrawer } from "./styles";
import EditTask from "./EditTask";
import { Padding } from "../Spacing";
import SkeletonText from "../SkeletonText";
import SkeletonHeading from "../SkeletonHeading";
import FETCH_TASK from "./fetchTask.graphql";
import UPDATE_TASK from "./updateTask.graphql";
import { Task } from "../../types";

type Props = {
  taskId: string;
  readOnly?: boolean;
  onClose: () => void;
  hideStatus?: boolean;
  onDeleteTask: (task: Task) => void;
};

const Component = ({ taskId, readOnly, onClose, hideStatus, onDeleteTask }: Props) => {
  return (
    <Drawer isOpen={Boolean(taskId)} onClose={onClose}>
      <TaskDrawer>
        <Query query={FETCH_TASK} variables={{ id: taskId }}>
          {query => {
            console.log(query);

            if (query.loading) {
              return (
                <Padding size="l">
                  <Padding bottom="l">
                    <SkeletonHeading />
                  </Padding>
                  <SkeletonText />
                </Padding>
              );
            }

            return (
              <Mutation mutation={UPDATE_TASK}>
                {updateTask => {
                  const handleSave = fields => {
                    updateTask({
                      variables: {
                        input: {
                          id: taskId,
                          ...fields
                        }
                      }
                    })
                  }

                  return (
                    <EditTask
                      readOnly={readOnly}
                      hideStatus={hideStatus}
                      onSave={handleSave}
                      task={query.data.task}
                      onDeleteTask={onDeleteTask}
                    />
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      </TaskDrawer>
    </Drawer>
  );
};

export default Component;
