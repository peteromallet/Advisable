// Renders the drawer for a task
import * as React from "react";
import { filter } from "lodash";
import { Query, graphql, compose } from "react-apollo";
import Drawer from "../Drawer";
import { TaskDrawer } from "./styles";
import EditTask from "./EditTask";
import { Padding } from "../Spacing";
import SkeletonText from "../SkeletonText";
import SkeletonHeading from "../SkeletonHeading";
import FETCH_TASK from "./fetchTask.graphql";
import UPDATE_NAME from "./updateName.graphql";
import UPDATE_DUE_DATE from "./updateDueDate.graphql";
import UPDATE_ESTIMATE from "./updateEstimate.graphql";
import UPDATE_DESCRIPTION from "./updateDescription.graphql";

const Component = ({
  taskId,
  onClose,
  readOnly,
  isClient,
  hideStatus,
  onDeleteTask,
  showStatusNotice,
  updateName,
  updateDueDate,
  updateEstimate,
  updateDescription
}) => {
  if (!taskId) return null;
  const [saving, setSaving] = React.useState({});

  const mutations = {
    name: updateName,
    dueDate: updateDueDate,
    estimate: updateEstimate,
    description: updateDescription,
  }

  const handleSave = async (attr, value) => {
    setSaving(s => ({ ...s, [attr]: true }))
    const mutation = mutations[attr];
    await mutation({
      variables: {
        input: {
          id: taskId,
          [attr]: value
        },
      },
    });
    setSaving(s => ({ ...s, [attr]: false }))
  };

  const isSaving = filter(saving, loading => loading).length > 0;

  return (
    <Drawer isOpen={Boolean(taskId)} onClose={onClose}>
      <TaskDrawer>
        <Query query={FETCH_TASK} variables={{ id: taskId }}>
          {query => {
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
              <EditTask
                isSaving={isSaving}
                readOnly={readOnly}
                isClient={isClient}
                hideStatus={hideStatus}
                onSave={handleSave}
                task={query.data.task}
                onDeleteTask={onDeleteTask}
                showStatusNotice={showStatusNotice}
              />
            );
          }}
        </Query>
      </TaskDrawer>
    </Drawer>
  );
};

export default compose(
  graphql(UPDATE_NAME, { name: "updateName" }),
  graphql(UPDATE_DUE_DATE, { name: "updateDueDate" }),
  graphql(UPDATE_ESTIMATE, { name: "updateEstimate" }),
  graphql(UPDATE_DESCRIPTION, { name: "updateDescription" })
)(Component);
