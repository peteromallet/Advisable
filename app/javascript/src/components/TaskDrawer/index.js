// Renders the drawer for a task
// The trask drawer component heavily relys on apollo client caching.
// Alot of the UX expects that tasks associated application record is
// preloaded. This component should eventually be rewritten as it has
// become very bloated from when it was a simple task drawer.
import * as React from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { get, filter } from "lodash-es";
import Drawer from "../Drawer";
import { TaskDrawer as TaskDrawerStyles } from "./styles";
import EditTask from "./EditTask";
import { Padding } from "../Spacing";
import SkeletonText from "../SkeletonText";
import SkeletonHeading from "../SkeletonHeading";
import DrawerActions from "./DrawerActions";
import FETCH_TASK from "../../graphql/queries/taskDetails";
import SubmitPrompt from "./SubmitPrompt";
import AssignPrompt from "./AssignPrompt";
import RepeatPrompt from "./RepeatPrompt";
import DeletePrompt from "./DeletePrompt";
import ApprovePrompt from "./ApprovePrompt";
import {
  updateTaskName as UPDATE_NAME,
  updateTaskDueDate as UPDATE_DUE_DATE,
  updateTaskEstimate as UPDATE_ESTIMATE,
  updateTaskDescription as UPDATE_DESCRIPTION,
} from "../../graphql/mutations/tasks";
import TaskDrawerErrorBoundary from "./ErrorBoundary";

const DELETE_PROMPT = "DELETE_PROMPT";
const APPROVE_PROMPT = "APPROVE_PROMPT";
const REPEAT_PROMPT = "REPEAT_PROMPT";
const ASSIGN_PROMPT = "ASSIGN_PROMPT";
const SUBMIT_PROMPT = "SUBMIT_PROMPT";

const TaskDrawer = ({
  taskId,
  onClose,
  history,
  readOnly,
  isClient,
  hideStatus,
  onDeleteTask,
  showStatusNotice,
  projectType,
  onCreateRepeatingTask,
}) => {
  const query = useQuery(FETCH_TASK, {
    variables: { id: taskId },
    skip: !taskId,
  });
  const [prompt, setPrompt] = React.useState(null);
  const [saving, setSaving] = React.useState({});
  const [updateName] = useMutation(UPDATE_NAME);
  const [updateDueDate] = useMutation(UPDATE_DUE_DATE);
  const [updateEstimate] = useMutation(UPDATE_ESTIMATE);
  const [updateDescription] = useMutation(UPDATE_DESCRIPTION);

  React.useEffect(() => {
    if (query.error) {
      onClose();
    }
  }, [onClose, query.error]);

  if (!taskId) return null;

  const mutations = {
    name: updateName,
    dueDate: updateDueDate,
    estimate: updateEstimate,
    flexibleEstimate: updateEstimate,
    description: updateDescription,
  };

  const handleSave = async (attr, fields) => {
    setSaving({ ...saving, [attr]: true });
    const mutation = mutations[attr];
    await mutation({
      variables: {
        input: {
          id: taskId,
          ...fields,
        },
      },
    });
    setSaving({ ...saving, [attr]: false });
  };

  const handleDelete = (task) => {
    setPrompt(null);
    onDeleteTask(task);
  };

  const isSaving = filter(saving, (loading) => loading).length > 0;
  const task = get(query, "data.task");

  if (!task) return null;

  return (
    <Drawer
      onClose={onClose}
      isOpen={Boolean(taskId)}
      actions={
        query.loading
          ? []
          : !readOnly && (
              <DrawerActions
                isClient={isClient}
                task={task}
                onDelete={() => setPrompt(DELETE_PROMPT)}
              />
            )
      }
    >
      <TaskDrawerErrorBoundary>
        <TaskDrawerStyles>
          {query.loading && (
            <Padding size="l">
              <Padding bottom="l">
                <SkeletonHeading />
              </Padding>
              <SkeletonText />
            </Padding>
          )}

          {prompt === DELETE_PROMPT && (
            <DeletePrompt
              task={task}
              onClose={() => setPrompt(null)}
              onDelete={handleDelete}
            />
          )}

          {prompt === ASSIGN_PROMPT && (
            <AssignPrompt
              task={task}
              onClose={() => setPrompt(null)}
              onAssign={() => setPrompt(null)}
            />
          )}

          {prompt === APPROVE_PROMPT && (
            <ApprovePrompt
              task={task}
              onClose={() => setPrompt(null)}
              onApprove={() => {
                if (task.repeat) {
                  setPrompt(REPEAT_PROMPT);
                } else {
                  setPrompt(null);
                }
              }}
            />
          )}

          {prompt === SUBMIT_PROMPT && (
            <SubmitPrompt
              task={task}
              onClose={() => setPrompt(null)}
              onSubmit={() => {
                setPrompt(null);
              }}
            />
          )}

          {prompt === REPEAT_PROMPT && (
            <RepeatPrompt
              task={task}
              onClose={() => setPrompt(null)}
              onRepeat={(task) => {
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
              task={task}
              isSaving={isSaving}
              readOnly={readOnly}
              isClient={isClient}
              onSave={handleSave}
              setPrompt={setPrompt}
              hideStatus={hideStatus}
              showStatusNotice={showStatusNotice}
              projectType={projectType}
            />
          )}
        </TaskDrawerStyles>
      </TaskDrawerErrorBoundary>
    </Drawer>
  );
};

export default withRouter(TaskDrawer);
