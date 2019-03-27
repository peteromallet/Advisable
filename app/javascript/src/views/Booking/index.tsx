import * as React from "react";
import Drawer from "../../components/Drawer";
import TaskDrawer from "../../components/TaskDrawer";

const tasks = [
  {
    id: "tas_1234",
    status: "Not Assigned",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_1234",
    status: "Quote Received",
    name:
      "Another task that has an estimate and will through warning when editing description",
    dueDate: "2019-03-28",
    estimate: "8 hours",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_1234",
    status: "In Progress",
    name: "This task is in progress and the description can not be edited",
    dueDate: "2019-03-28",
    estimate: "8 hours",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
];

export default () => {
  const [drawer, setDrawer] = React.useState(null);

  return (
    <div>
      <p>
        Task 1 has not been assigned and can be edited without any side effects
      </p>
      <button onClick={() => setDrawer(1)}>Open Task 1</button>
      <TaskDrawer
        task={tasks[0]}
        isClient={true}
        isOpen={drawer === 1}
        onClose={() => setDrawer(null)}
      />

      <p>
        Task 2 has an estimate and so editing the description will display a
        warning
      </p>
      <button onClick={() => setDrawer(2)}>Open Task 2</button>
      <TaskDrawer
        task={tasks[1]}
        isClient={true}
        isOpen={drawer === 2}
        onClose={() => setDrawer(null)}
      />

      <p>Task 3 is in progress and so the description can not be edited</p>
      <button onClick={() => setDrawer(3)}>Open Task 3</button>
      <TaskDrawer
        task={tasks[2]}
        isClient={true}
        isOpen={drawer === 3}
        onClose={() => setDrawer(null)}
      />
    </div>
  );
};
