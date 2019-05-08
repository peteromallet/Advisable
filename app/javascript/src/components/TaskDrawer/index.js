// Renders the drawer for a task
import * as React from "react";
import { get, filter } from "lodash";
import { withRouter } from "react-router-dom";
import { Query, graphql, compose } from "react-apollo";
import Drawer from "../Drawer";
import { TaskDrawer } from "./styles";
import EditTask from "./EditTask";
import Button from "../Button";
import Text from "../Text";
import ButtonGroup from "../ButtonGroup";
import { Padding } from "../Spacing";
import SkeletonText from "../SkeletonText";
import SkeletonHeading from "../SkeletonHeading";
import DrawerActions from "./DrawerActions";
import FETCH_TASK from "../../graphql/queries/taskDetails";
import UPDATE_NAME from "./updateName.graphql";
import DELETE_TASK from "./deleteTask.graphql";
import UPDATE_DUE_DATE from "./updateDueDate.graphql";
import UPDATE_ESTIMATE from "./updateEstimate.graphql";
import UPDATE_DESCRIPTION from "./updateDescription.graphql";
import { Confirmation, ConfirmationContainer } from "./styles";
import RepeatPrompt from "./RepeatPrompt";
import ApprovePrompt from "./ApprovePrompt";

const DELETE_PROMPT = "DELETE_PROMPT";
const APPROVE_PROMPT = "APPROVE_PROMPT";
const REPEAT_PROMPT = "REPEAT_PROMPT";

const Component = ({
  taskId,
  onClose,
  history,
  readOnly,
  isClient,
  hideStatus,
  onDeleteTask,
  showStatusNotice,
  updateName,
  deleteTask,
  updateDueDate,
  updateEstimate,
  updateDescription,
  onCreateRepeatingTask,
}) => {
  const [prompt, setPrompt] = React.useState(null);
  const [saving, setSaving] = React.useState({});

  if (!taskId) return null;

  const mutations = {
    name: updateName,
    dueDate: updateDueDate,
    estimate: updateEstimate,
    description: updateDescription,
  };

  const handleSave = async (attr, value) => {
    setSaving(s => ({ ...s, [attr]: true }));
    const mutation = mutations[attr];
    await mutation({
      variables: {
        input: {
          id: taskId,
          [attr]: value,
        },
      },
    });
    setSaving(s => ({ ...s, [attr]: false }));
  };

  const handleDelete = task => () => {
    setPrompt(null);
    onDeleteTask(task);
    deleteTask({
      variables: {
        input: {
          task: task.id,
        },
      },
    });
  };

  const isSaving = filter(saving, loading => loading).length > 0;

  return (
    <Query query={FETCH_TASK} variables={{ id: taskId }}>
      {query => {
        const task = get(query, "data.task");

        return (
          <Drawer
            onClose={onClose}
            isOpen={Boolean(taskId)}
            actions={
              query.loading ? (
                []
              ) : (
                <DrawerActions
                  isClient={isClient}
                  task={query.data.task}
                  onDelete={() => setPrompt(DELETE_PROMPT)}
                />
              )
            }
          >
            <TaskDrawer>
              {query.loading && (
                <Padding size="l">
                  <Padding bottom="l">
                    <SkeletonHeading />
                  </Padding>
                  <SkeletonText />
                </Padding>
              )}

              {prompt === DELETE_PROMPT && (
                <Confirmation>
                  <ConfirmationContainer>
                    <Padding bottom="l">
                      <Text>Are you sure you want to delete this task?</Text>
                    </Padding>
                    <ButtonGroup fullWidth>
                      <Button
                        onClick={handleDelete(query.data.task)}
                        styling="danger"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => setPrompt(null)}
                        styling="outlined"
                      >
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </ConfirmationContainer>
                </Confirmation>
              )}

              {prompt === APPROVE_PROMPT && (
                <ApprovePrompt
                  task={task}
                  onClose={() => setPrompt(null)}
                  onApprove={() => {
                    if (Boolean(task.repeat)) {
                      setPrompt(REPEAT_PROMPT);
                    } else {
                      setPrompt(null);
                    }
                  }}
                />
              )}

              {prompt === REPEAT_PROMPT && (
                <RepeatPrompt
                  task={task}
                  onClose={() => setPrompt(null)}
                  onRepeat={task => {
                    history.replace(task.id);
                    if (onCreateRepeatingTask) {
                      onCreateRepeatingTask(task);
                    }
                    setPrompt(null);
                  }}
                />
              )}

              {!query.loading && (
                <EditTask
                  isSaving={isSaving}
                  readOnly={readOnly}
                  isClient={isClient}
                  hideStatus={hideStatus}
                  onSave={handleSave}
                  task={query.data.task}
                  setPrompt={setPrompt}
                  showStatusNotice={showStatusNotice}
                />
              )}
            </TaskDrawer>
          </Drawer>
        );
      }}
    </Query>
  );
};

export default withRouter(
  compose(
    graphql(UPDATE_NAME, { name: "updateName" }),
    graphql(DELETE_TASK, { name: "deleteTask" }),
    graphql(UPDATE_DUE_DATE, { name: "updateDueDate" }),
    graphql(UPDATE_ESTIMATE, { name: "updateEstimate" }),
    graphql(UPDATE_DESCRIPTION, { name: "updateDescription" })
  )(Component)
);
