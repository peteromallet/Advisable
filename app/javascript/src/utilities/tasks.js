import pluralize from "./pluralize";
import currency from "./currency";

// Returns true if the task stage is submitted or any stage after
export const hasBeenSubmitted = task => {
  return ["Paid", "Approved", "Submitted"].indexOf(task.stage) > -1;
};

// When a task has been submitted we want to dispay "Hours Worked" instead of "Quote".
export const hoursLabel = task => {
  if (hasBeenSubmitted(task)) return "Hours Worked";
  return "Quote";
};

// displays the estimate or hours worked for a task.
export const hoursDisplay = task => {
  if (hasBeenSubmitted(task)) {
    return pluralize(task.hoursWorked || 0, "hour", "hours");
  }

  if (task.flexibleEstimate) {
    return `${task.estimate || 0} - ${task.flexibleEstimate || 0} hours`;
  }

  return pluralize(task.estimate, "hour", "hours");
};

// Displays the quote given for a task
export const displayTaskQuote = task => {
  if (task.pricingType === "Fixed") {
    let quote = currency(task.estimate);
    if (task.flexibleEstimate) {
      quote += ` - ${currency(task.flexibleEstimate)}`;
    }
    return quote;
  }

  return hoursDisplay(task);
};
