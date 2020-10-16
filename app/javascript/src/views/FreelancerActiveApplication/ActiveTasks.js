import { filter } from "lodash-es";
import NewTask from "../../components/NewTask";
import TaskList from "../../components/TaskList";
import NoTasks from "./NoTasks";

// Renders the freelancer's active tasks inside the freelancer active project
// view.
const ActiveTasks = ({ isClient, onClick, onCreate, application }) => {
  let tasks = filter(application.tasks, (t) => t.stage !== "Approved");

  if (tasks.length === 0) {
    return <NoTasks onNewTask={onCreate} application={application} />;
  }

  return (
    <TaskList
      tasks={tasks}
      isClient={isClient}
      onClickTask={onClick}
      lastRow={
        application.status === "Working" && (
          <NewTask onCreate={onCreate} application={application} />
        )
      }
    />
  );
};

export default ActiveTasks;
