import * as Yup from "yup";

export const rateValidationSchema = Yup.object().shape({
  rate: Yup.number()
    .nullable()
    .required("Please enter your hourly rate for this project")
    .moreThan(0, "Your rate must be greater than 0"),
});

export const hasCompleteTasksStep = application => {
  const hasAddedTasks = application.tasks.length > 0;
  // Filter tasks to see if there are any tasks that still need a name or
  // description.
  const incompleteTasks = application.tasks.filter(t => {
    return !Boolean(t.name) || !Boolean(t.description);
  });
  return hasAddedTasks && incompleteTasks.length === 0;
};
