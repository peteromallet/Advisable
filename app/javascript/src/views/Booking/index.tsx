import * as React from "react";
import TaskDrawer from "../../components/TaskDrawer";

const tasks = [
  {
    id: "tas_1234",
    status: "Not Assigned",
    name: "Write style guide for content voice and tone",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_1234",
    status: "Quote Requested",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_1234",
    status: "Quote Provided",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    estimate: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_1234",
    status: "Assigned",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    estimate: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_1234",
    status: "In Progress",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    estimate: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_1234",
    status: "Pending Approval",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    estimate: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  }
];

export default () => {
  const [task, setTask] = React.useState(null);

  let activeTask = task || [];

  return (
    <div>
      <TaskDrawer
        task={tasks[activeTask[0] || 0]}
        isClient={activeTask[1]}
        isOpen={task !== null}
        onClose={() => setTask(null)}
      />

      {tasks.map((task, i) => (
        <React.Fragment key={i}>
          <p>Viewing a "{task.status}" task as a client</p>
          <button onClick={() => setTask([i, true])}>Open Task</button>

          <p>Viewing a "{task.status}" task as a freelancer</p>
          <button onClick={() => setTask([i, false])}>Open Task</button>
        </React.Fragment>
      ))}
    </div>
  );
};
